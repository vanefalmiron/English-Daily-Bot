function enviarPalabraDelDia() {

  var TELEGRAM_TOKEN = "TU_TELEGRAM_BOT_TOKEN";
  var CHAT_ID        = "TU_TELEGRAM_CHAT_ID";
  var GROQ_KEY       = "TU_GROQ_API_KEY";

  // Recupera historial de palabras ya enviadas
  var props = PropertiesService.getScriptProperties();
  var historialRaw = props.getProperty("palabras_usadas");
  var palabrasUsadas = historialRaw ? JSON.parse(historialRaw) : [];

  // Mantiene solo las últimas 150 para no saturar
  if (palabrasUsadas.length > 150) {
    palabrasUsadas = palabrasUsadas.slice(-150);
  }

  var historialTexto = palabrasUsadas.length > 0
    ? "PALABRAS YA ENVIADAS (no repetir ninguna de estas):\n" + palabrasUsadas.join(", ")
    : "Aún no hay historial de palabras enviadas.";

  var prompt =
    "Eres un experto en lingüística inglesa y diseño de aprendizaje acelerado. " +
    "Tu misión es seleccionar las 3 palabras en inglés con mayor impacto real " +
    "para alguien que necesita comunicarse con fluidez y confianza en entornos " +
    "profesionales internacionales y viajes al extranjero.\n\n" +

    "CRITERIOS DE SELECCIÓN (obligatorios):\n" +
    "- Alta frecuencia de uso en conversaciones reales de negocios y viajes\n" +
    "- Variedad de categorías: mezcla verbos, adjetivos, phrasal verbs y expresiones\n" +
    "- Progresión de dificultad: incluye al menos una palabra de nivel B1, una B2 y una C1\n" +
    "- Evita palabras turísticas básicas o de manual escolar\n\n" +

    historialTexto + "\n\n" +

    "FORMATO DE RESPUESTA (sigue este formato exacto para cada palabra):\n\n" +
    "1️⃣ *PALABRA* — _categoría gramatical_\n" +
    "🔊 Pronunciación: /pronunciación/ (truco: suena como '...')\n" +
    "📖 Significado: explicación clara y directa en español\n" +
    "💼 En el trabajo: frase de ejemplo → traducción\n" +
    "✈️ De viaje: frase de ejemplo → traducción\n" +
    "🧠 Tip pro: consejo para usarla de forma natural o error común a evitar\n\n" +
    "---\n\n" +

    "Al final del mensaje añade:\n" +
    "💡 *Reto del día:* una micro-tarea concreta para practicar las 3 palabras hoy " +
    "(máximo 2 líneas, que sea accionable y divertida).\n\n" +

    "Responde ÚNICAMENTE con el contenido formateado, sin introducción ni explicaciones extra.";

  var groqResponse = UrlFetchApp.fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "post",
    contentType: "application/json",
    headers: { "Authorization": "Bearer " + GROQ_KEY },
    payload: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1500,
      temperature: 0.9
    })
  });

  var contenido = JSON.parse(groqResponse.getContentText())
    .choices[0].message.content;

  // Extrae las palabras nuevas del mensaje y las guarda en el historial
  var nuevasPalabras = contenido.match(/1️⃣ \*([A-Z\s]+)\*/g) || [];
  nuevasPalabras = nuevasPalabras.map(function(p) {
    return p.replace("1️⃣ *", "").replace("*", "").trim();
  });
  palabrasUsadas = palabrasUsadas.concat(nuevasPalabras);
  props.setProperty("palabras_usadas", JSON.stringify(palabrasUsadas));

  // Envía a Telegram
  var fecha = Utilities.formatDate(new Date(), "Europe/Madrid", "EEEE dd 'de' MMMM");
  var mensaje = "🇬🇧 *3 palabras del día — " + fecha + "*\n\n" + contenido;

  UrlFetchApp.fetch("https://api.telegram.org/bot" + TELEGRAM_TOKEN + "/sendMessage", {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
      chat_id: CHAT_ID,
      text: mensaje,
      parse_mode: "Markdown"
    })
  });

  Logger.log("Enviado OK. Historial: " + palabrasUsadas.length + " palabras guardadas.");
}
