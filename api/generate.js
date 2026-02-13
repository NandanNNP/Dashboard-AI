import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { jsonInput, userInstruction } = req.body;

    if (!jsonInput || !userInstruction) {
      return res.status(400).json({ error: "Missing input data" });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const systemPrompt = `
You are a senior frontend engineer and dashboard designer.

Your task is to transform structured JSON data into a clean, modern,
responsive dashboard UI using ONLY HTML and CSS.

Rules:
- Output must be valid HTML.
- Include CSS inside <style> tags.
- Do NOT include JavaScript.
- Do NOT explain anything.
- Do NOT wrap output in markdown.
- Only return raw HTML.
- The dashboard must visually represent the provided JSON data accurately.
- Use modern design principles.
- Responsive layout required.

Return ONLY HTML.
`;

    const userPrompt = `
JSON Data:
${jsonInput}

User Instruction:
${userInstruction}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    res.status(200).json({
      html: response.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI generation failed" });
  }
}
