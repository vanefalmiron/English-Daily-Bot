# 🇬🇧 English Daily Bot — Automatización de vocabulario

Automatización 100% gratuita que envía cada mañana 3 palabras en inglés directamente a Telegram, con pronunciación, significado, ejemplos reales, tips profesionales y un reto diario para practicar.

---

## ¿Qué hace?

Cada día a las 8:00am (hora Madrid) recibes un mensaje en Telegram con:

- 3 palabras en inglés seleccionadas por impacto real en trabajo y viajes
- Pronunciación con truco para recordarla
- Significado claro en español
- 2 ejemplos de uso en contexto real (trabajo y viaje)
- Tip pro: consejo de uso natural o error común a evitar
- Reto del día: micro-tarea para practicar las 3 palabras
- Sin repeticiones: el bot recuerda todas las palabras ya enviadas

---

## Stack tecnológico

| Herramienta | Uso | Coste |
|---|---|---|
| Google Apps Script | Scheduler, ejecución y memoria del historial | Gratis |
| Groq API (LLaMA 3.3 70B) | Generación del contenido con IA | Gratis |
| Telegram Bot API | Entrega del mensaje al móvil | Gratis |

**Coste total: 0€/mes**

---

## Arquitectura

```
Google Apps Script (trigger diario 8am)
        ↓
PropertiesService → carga historial de palabras ya enviadas
        ↓
Groq API (LLaMA 3.3 70B) → genera 3 palabras nuevas evitando repeticiones
        ↓
PropertiesService → guarda las nuevas palabras en el historial
        ↓
Telegram Bot → mensaje formateado en tu móvil
```

---

## Ejemplo de mensaje recibido

```
🇬🇧 3 palabras del día — martes 01 de abril

1️⃣ LEVERAGE — verbo
🔊 Pronunciación: /ˈlevərɪdʒ/ (truco: suena como 'lé-ve-rich')
📖 Significado: aprovechar algo al máximo para obtener ventaja
💼 En el trabajo: We need to leverage our network to close this deal → Necesitamos aprovechar nuestra red para cerrar este trato
✈️ De viaje: You can leverage your hotel points to get a free upgrade → Puedes aprovechar tus puntos del hotel para conseguir una mejora gratuita
🧠 Tip pro: En reuniones de negocios es una palabra clave. Evita traducirla literalmente como "apalancar".

---

💡 Reto del día: En tu próxima reunión o email, usa "leverage" en una frase real.
Si no tienes reunión hoy, escríbela en un mensaje a un compañero.
```

---

## Cómo usarlo tú también

### 1. Crea tu bot de Telegram
- Abre Telegram y busca `@BotFather`
- Escribe `/newbot` y sigue los pasos
- Guarda el **Bot Token** que te dará
- Escríbele a tu bot `/start` para activarlo
- Obtén tu **Chat ID** visitando:
  `https://api.telegram.org/bot<TU_TOKEN>/getUpdates`

### 2. Consigue tu clave de Groq
- Crea cuenta gratuita en [console.groq.com](https://console.groq.com)
- Ve a *API Keys* → *Create API Key*
- Guarda la clave (empieza por `gsk_...`)

### 3. Configura Google Apps Script
- Ve a [script.google.com](https://script.google.com)
- Crea un nuevo proyecto
- Copia el código de `word_of_day.gs`
- Reemplaza las variables con tus claves:

```javascript
var TELEGRAM_TOKEN = "TU_TELEGRAM_BOT_TOKEN";
var CHAT_ID        = "TU_TELEGRAM_CHAT_ID";
var GROQ_KEY       = "TU_GROQ_API_KEY";
```

### 4. Configura la zona horaria
- En Apps Script → ⚙️ Configuración del proyecto
- Zona horaria → `(GMT+01:00) Madrid`

### 5. Activa el trigger diario
- Clic en el icono del reloj (Triggers)
- Añadir trigger → función `enviarPalabraDelDia`
- Tipo: Temporizador por día → 8:00 a 9:00am
- Guardar

---

## Sistema anti-repetición

El bot usa `PropertiesService` de Google Apps Script para guardar un historial de todas las palabras ya enviadas. En cada ejecución:

1. Carga el historial guardado
2. Se lo pasa al modelo como contexto para que no repita
3. Extrae las palabras nuevas del mensaje generado
4. Las añade al historial para el día siguiente

El historial guarda hasta 150 palabras. A ese ritmo (3 palabras/día) tienes vocabulario único para 50 días sin repetición.

---

## Archivos del proyecto

```
📁 english-daily-bot/
├── word_of_day.gs   # Script principal (Google Apps Script)
└── README.md        # Este archivo
```

---

## Autor

Proyecto creado como automatización personal para aprender inglés de forma consistente y progresiva.
