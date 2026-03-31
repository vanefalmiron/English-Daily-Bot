function enviarPalabraDelDia() {

  var TELEGRAM_TOKEN = "TU_TELEGRAM_BOT_TOKEN";
  var CHAT_ID        = "TU_TELEGRAM_CHAT_ID";
  var GROQ_KEY       = "TU_GROQ_API_KEY";

  var prompt = "Eres un profesor de inglés nativo. Genera exactamente 5 palabras en inglés " +
    "muy útiles para hablar con fluidez en viajes y en el trabajo.\n\n" +
    "Para cada palabra usa este formato:\n\n" +
    "1️⃣ PALABRA (pronunciación aproximada)\n" +
    "📖 Significado: ...\n" +
    "💼 Ejemplo trabajo: frase en inglés → traducción\n" +
    "✈️ Ejemplo viaje: frase en inglés → traducción\n" +
    "📊 Nivel: Básico / Intermedio / Avanzado\n\n" +
    "Separa cada palabra con ---\n" +
    "Usa phrasal verbs, expresiones coloquiales, adjetivos útiles. " +
    "Evita palabras básicas como hello, thanks, please.";

  var groqResponse = UrlFetchApp.fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "post",
    contentType: "application/json",
    headers: { "Authorization": "Bearer " + "TU_GROQ_API_KEY" },
    payload: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1500
    })
  });

  var contenido = JSON.parse(groqResponse.getContentText())
    .choices[0].message.content;

  var fecha = Utilities.formatDate(new Date(), "Europe/Madrid", "EEEE dd 'de' MMMM");
  var mensaje = "🇬🇧 *Palabras del día — " + fecha + "*\n\n" + contenido;

  UrlFetchApp.fetch("https://api.telegram.org/bot" + "TU_TELEGRAM_BOT_TOKEN"  + "/sendMessage", {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
      chat_id: 7195170833,
      text: mensaje,
      parse_mode: "Markdown"
    })
  });

  Logger.log("Enviado OK");
}
