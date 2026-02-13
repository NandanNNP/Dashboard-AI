# Instant Dashboard Generator

A web application that transforms structured JSON data into a clean, modern dashboard UI using an AI model.

This project was built as part of the Onepane.ai technical assessment.

---

## 🚀 Overview

The application allows users to:

1. Paste structured JSON data
2. Provide a natural language instruction
3. Generate a responsive dashboard UI
4. Preview the generated HTML/CSS instantly

The AI model converts the JSON data into a visually structured dashboard layout.

---

## 🏗 Architecture

This project follows a production-ready architecture:

### Frontend
- React (Vite)
- Tailwind CSS
- shadcn/ui components

### Backend
- Vercel Serverless Function (`/api/generate`)

The frontend sends user input to the serverless function.  
The serverless function:

- Injects a hidden **System Prompt**
- Calls the AI API
- Returns only raw HTML/CSS
- Keeps API keys secure (never exposed to the client)

This ensures proper separation between UI and AI logic.

---

## 🧠 AI API Used

This project uses an **OpenAI-compatible API**.

Currently configured to use:

- **Groq API**
- Model: `llama3-70b-8192`

Groq provides an OpenAI-compatible interface, allowing usage via the official OpenAI SDK with a custom `baseURL`.

Example configuration:

```js
const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});