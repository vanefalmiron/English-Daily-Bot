# 🇬🇧 Palabra del Día en Inglés — Automatización

Automatización 100% gratuita que envía cada mañana 5 palabras en inglés directamente a Telegram, con significado, ejemplos de uso y traducción al español.

---

## ¿Qué hace?

Cada día a las 8:00am (hora Madrid) recibes un mensaje en Telegram con:

- 5 palabras en inglés útiles para viajes y trabajo
- Pronunciación aproximada
- Significado en español
- 2 ejemplos de uso reales (trabajo y viaje)
- Nivel: Básico / Intermedio / Avanzado

---

## Stack tecnológico

| Herramienta | Uso | Coste |
|---|---|---|
| Google Apps Script | Scheduler y ejecución del script | Gratis |
| Groq API (LLaMA 3.3 70B) | Generación del contenido con IA | Gratis |
| Telegram Bot API | Entrega del mensaje al móvil | Gratis |

---

## Arquitectura

```
Google Apps Script (trigger diario)
        ↓
   Groq API → genera 5 palabras con IA
        ↓
   Telegram Bot → mensaje en tu móvil
```

---

## Cómo usarlo tú también

### 1. Crea tu bot de Telegram
- Abre Telegram y busca `@BotFather`
- Escribe `/newbot` y sigue los pasos
- Guarda el **Bot Token** que te dará
- Escríbele a tu bot `/start` para activarlo
- Obtén tu **Chat ID** visitando: `https://api.telegram.org/bot<TU_TOKEN>/getUpdates`

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

## Ejemplo de mensaje recibido

```
🇬🇧 Palabras del día — martes 01 de abril

1️⃣ NETWORKING (net-wor-king)
📖 Significado: Establecer contactos profesionales
💼 Ejemplo trabajo: I went to a networking event last night → Fui a un evento de networking anoche
✈️ Ejemplo viaje: Networking with locals can open many doors → Conectar con locales puede abrir muchas puertas
📊 Nivel: Intermedio

---
...
```

---

## Archivos del proyecto

```
📁 english-daily-bot/
├── word_of_day.gs   # Script principal (Google Apps Script)
└── README.md        # Este archivo
```

---

## ⚠️ Importante

Nunca subas tus claves reales a GitHub. Usa siempre los placeholders del código y configura tus claves directamente en Google Apps Script.

---

## Autor

Proyecto creado como automatización personal para aprender inglés de forma consistente y sin esfuerzo diario.
