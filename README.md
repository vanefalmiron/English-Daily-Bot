# 🇬🇧 English Daily Bot

Automatización 100% gratuita que envía cada mañana 3 palabras en inglés directamente a Telegram, con pronunciación, significado, ejemplos reales, tips profesionales y un reto diario para practicar.

---

## ¿De qué va esto?

Aprender inglés de forma consistente es difícil cuando depende de que tú te acuerdes de abrir una app. Este bot da la vuelta al problema — es él quien te encuentra a ti, cada mañana, donde ya estás: en Telegram.

Cada día a las 8:00 recibes 3 palabras en inglés seleccionadas por su impacto real en contextos de trabajo y viajes. No vocabulario de relleno — palabras que vas a usar de verdad.

Cada palabra llega con todo lo que necesitas para no olvidarla:

- **Pronunciación** con truco mnemotécnico para recordarla
- **Significado** claro en español, sin rodeos
- **2 ejemplos en contexto real** — uno laboral, uno de viaje
- **Tip pro** con el matiz de uso natural o el error típico a evitar
- **Reto del día** para practicar las 3 palabras antes de que acabe la jornada

Y lo mejor: el bot recuerda todo lo que ya te ha enviado. Nunca repite.

---

## ¿Por qué mola?

- **Coste total: 0 €** — sin suscripciones, sin tarjeta, sin servidor propio
- **Sin instalaciones** — todo corre en la nube dentro de tu cuenta de Google
- **Funciona solo** — una vez configurado no hay que tocarlo nunca más
- **Generado con IA** — cada mensaje es único, contextualizado y fresco
- **Anti-repetición inteligente** — el historial acumula hasta 150 palabras sin repetir
- **Privado** — tus datos no salen de tu ecosistema Google y Telegram

---

## Stack

| Capa | Tecnología | Coste |
|---|---|---|
| Lógica y ejecución | Google Apps Script | Gratis |
| Generación de contenido con IA | Groq API — LLaMA 3.3 70B | Gratis |
| Notificaciones | Telegram Bot API | Gratis |
| Memoria anti-repetición | PropertiesService (Apps Script) | Gratis |
| Scheduler (cron) | Triggers de Apps Script | Gratis |

---

## ¿Cómo funciona?

```
Cada día a las 8:00
    → Carga el historial de palabras ya enviadas (PropertiesService)
    → Llama a Groq API pasando el historial como contexto
    → LLaMA 3.3 genera 3 palabras nuevas con pronunciación, ejemplos y reto
    → Guarda las nuevas palabras en el historial
    → Envía el mensaje formateado a Telegram
```

El sistema anti-repetición garantiza vocabulario único durante 50 días seguidos (3 palabras × 50 días = 150 palabras antes del primer ciclo).

---

## Ejemplo de mensaje

```
🇬🇧 3 palabras del día — martes 01 de abril

1️⃣ LEVERAGE — verbo
🔊 Pronunciación: /ˈlevərɪdʒ/ (suena como "lé-ve-rich")
📖 Significado: aprovechar algo al máximo para obtener ventaja
💼 Trabajo: We need to leverage our network to close this deal
✈️ Viaje: You can leverage your hotel points to get a free upgrade
🧠 Tip pro: En reuniones de negocios es palabra clave. Evita
   traducirla literalmente como "apalancar".

──────────────────────────────

💡 Reto del día: Usa "leverage" en una frase real antes de
que acabe el día. En un email, en una reunión o en un mensaje
a un compañero.
```

---

## Requisitos

Antes de empezar necesitas:

- Una cuenta de **Gmail / Google**
- La app de **Telegram** instalada en el móvil
- Una cuenta gratuita en **[console.groq.com](https://console.groq.com)** para obtener la API key
- Acceso a **[script.google.com](https://script.google.com)** desde el navegador

---

## Configuración — paso a paso

### 1. Crear el bot de Telegram

Abre Telegram, busca **@BotFather** y sigue sus instrucciones para crear un bot nuevo. Al terminar te dará un **token** — guárdalo.

Para obtener tu **Chat ID** personal, busca **@userinfobot** en Telegram y pulsa Start. Te lo da al momento.

---

### 2. Conseguir la API key de Groq

Crea una cuenta gratuita en [console.groq.com](https://console.groq.com), ve a **API Keys → Create API Key** y guarda la clave. Empieza por `gsk_...`

Groq es gratuito y no requiere tarjeta para el nivel de uso de este proyecto.

---

### 3. Crear el proyecto en Apps Script

Ve a [script.google.com](https://script.google.com), crea un nuevo proyecto y ponle el nombre que quieras. Borra el contenido por defecto del editor y pega el código del archivo `word_of_day.gs`.

---

### 4. Rellenar la configuración

Al inicio del código hay tres variables que debes rellenar con tus datos:

- `TELEGRAM_TOKEN` → el token que te dio BotFather
- `CHAT_ID` → tu ID numérico de Telegram
- `GROQ_KEY` → tu clave de Groq (empieza por `gsk_...`)

---

### 5. Ajustar la zona horaria

En el panel de Apps Script ve a **Configuración del proyecto ⚙️** y cambia la zona horaria a `Europe/Madrid`. Así el trigger se ejecuta en tu hora local.

---

### 6. Autorizar permisos

La primera vez que ejecutes cualquier función, Google pedirá que autorices el acceso. Es un proceso estándar — solo ocurre una vez.

Ejecuta la función manualmente desde el editor para verificar que el mensaje llega correctamente a Telegram antes de activar el trigger automático.

---

### 7. Activar el trigger diario

En el panel lateral de Apps Script, abre la sección **Triggers (reloj ⏰)** y crea uno:

| Función | Cuándo se ejecuta |
|---|---|
| `enviarPalabraDelDia` | Todos los días · entre 8:00 y 9:00 |

Listo. A partir de aquí el bot trabaja solo.

---

## Solución de problemas

**No llega ningún mensaje**  
Ejecuta la función manualmente desde el editor y revisa los logs. Comprueba que el token, el chat_id y la Groq key están bien escritos.

**El bot repite palabras**  
Puede ocurrir si se borró el historial de PropertiesService. Ve a **Ejecución → Ver propiedades del script** para comprobar que el historial existe y tiene contenido.

**Error en la llamada a Groq**  
Verifica que tu API key de Groq sigue activa en [console.groq.com](https://console.groq.com) y que no has superado el límite de llamadas gratuitas.

**El trigger se ejecuta a deshora**  
Verifica que la zona horaria del proyecto esté configurada en `Europe/Madrid`.

---

## Seguridad

- El código y las credenciales viven dentro de tu cuenta privada de Google Apps Script
- Nadie más tiene acceso a tu script salvo tú
- Si el token de Telegram se compromete, revócalo desde @BotFather con `/revoke` y genera uno nuevo
- La API key de Groq se puede regenerar desde el panel de [console.groq.com](https://console.groq.com) si fuera necesario
- No compartas ni subas el archivo con credenciales a repositorios públicos

---

## Posibles mejoras futuras

- Selección de temática diaria (negocios, viajes, tecnología, conversación informal)
- Modo test con envío inmediato para probar nuevas palabras fuera del horario
- Historial exportable a Notion o Google Sheets para repasar
- Nivel de dificultad ajustable (básico, intermedio, avanzado)
- Versión para otros idiomas cambiando el prompt

---

*Hecho con Google Apps Script · Groq API · Telegram Bot API*
