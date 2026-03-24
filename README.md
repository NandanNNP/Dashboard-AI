# Dashboard AI

A web application that transforms structured JSON data into a clean, modern dashboard UI using an AI model.



---

## 🚀 Overview

The application allows users to:

1. **Paste structured JSON data** or use pre-built templates.
2. **Provide a natural language instruction** for the initial design.
3. **Iteratively Refine** the result with follow-up prompts (e.g., "make it blue", "add a sidebar").
4. **Live Edit** the generated HTML/CSS with instant preview updates.
5. **Manage a Library** of saved dashboards stored locally.
6. **Responsive Testing** with Desktop, Tablet, and Mobile viewports.
7. **Export** designs as standalone HTML files or copy the code.

The AI model converts the JSON data into a visually structured dashboard layout.

---

## 📺 Preview

![Dashboard AI Preview](https://github.com/user-attachments/assets/57f5c764-9f7a-4b9a-8a5e-9f3b8b1b2b3a)

> *Note: Replace the placeholder above with your actual demo video/GIF.*

---

## ✨ Features

- 🧠 **AI-Powered Generation**: Uses LLMs to transform data into professional UIs.
- 🔄 **Iterative Refinement**: Refine and tweak your dashboard until it's perfect.
- ⏪ **Undo Support**: Revert to previous versions if a refinement doesn't go as planned.
- 📝 **Live Code Editor**: Direct access to HTML/CSS with immediate preview synchronization.
- 📱 **Responsive Viewports**: Toggle between Mobile, Tablet, and Desktop views.
- 💾 **Local Library**: Save your favorite designs to `localStorage` for later use.
- 🎨 **Quick Templates**: Jumpstart your project with Sales or Analytics templates.
- 🚀 **Export & Copy**: Ready-to-use code for your next project.

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
- Model: `openai/gpt-oss-120b`

Groq provides an OpenAI-compatible interface, allowing usage via the official OpenAI SDK with a custom `baseURL`.

Example configuration:

```js
const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});