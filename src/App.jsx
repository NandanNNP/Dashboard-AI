import { useState } from "react";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [userInstruction, setUserInstruction] = useState("");
  const [generatedHtml, setGeneratedHtml] = useState("");

  const generateDashboard = async () => {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonInput,
        userInstruction,
      }),
    });

    const data = await response.json();
    setGeneratedHtml(data.html);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Instant Dashboard Generator</h1>

      <textarea
        placeholder="Paste JSON here"
        rows="10"
        style={{ width: "100%" }}
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Enter instruction"
        style={{ width: "100%", padding: "10px" }}
        value={userInstruction}
        onChange={(e) => setUserInstruction(e.target.value)}
      />

      <br /><br />

      <button onClick={generateDashboard}>
        Generate Dashboard
      </button>

      <hr />

      <div
        dangerouslySetInnerHTML={{ __html: generatedHtml }}
      />
    </div>
  );
}

export default App; 