import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import TextType from "@/components/ui/text/typing";

export default function Generator() {
  const [jsonInput, setJsonInput] = useState("");
  const [userInstruction, setUserInstruction] = useState("");
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [loading, setLoading] = useState(false);

  const validateJSON = (input) => {
    try {
      JSON.parse(input);
      return true;
    } catch {
      return false;
    }
  };

  const generateDashboard = async () => {
    if (!jsonInput.trim() || !userInstruction.trim()) {
      toast.error("Please provide both JSON data and instruction.");
      return;
    }

    if (!validateJSON(jsonInput)) {
      toast.error("Please provide valid JSON format.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jsonInput, userInstruction }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      setGeneratedHtml(data.html);

      toast.success("Dashboard generated successfully.");
    } catch (error) {
      toast.error("Something went wrong while generating the dashboard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Heading section */}

        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Dashboard AI</h1>
          <p className="text-muted-foreground text-white/80">
            
            <TextType 
  text={["Turn raw JSON into insights",
  "Powered by intelligent prompts",
  "Visualize anything. Instantly!"]}
  typingSpeed={75}
  pauseDuration={1500}
  showCursor
  cursorCharacter="_"
  texts={["Instant Insights from Your Data.","Build some amazing experiences!"]}
  deletingSpeed={50}
  variableSpeedEnabled={false}
  variableSpeedMin={60}
  variableSpeedMax={120}
  cursorBlinkDuration={0.5}
/>
          </p>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input section */}
          <Card className="shadow-xl border-0 bg-white/10 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white">Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-white font-medium">JSON Data</label>
                <Textarea
                  className="font-mono text-white"
                  rows={12}
                  placeholder="Paste structured JSON here..."
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-white font-medium">Instruction</label>
                <Input
                  className="text-white"
                  placeholder="Describe how the dashboard should look..."
                  value={userInstruction}
                  onChange={(e) => setUserInstruction(e.target.value)}
                />
              </div>

              <Button
                onClick={generateDashboard}
                className="w-full h-11 text-base"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Dashboard"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Preview section */}
          <Card className="shadow-xl border-0 bg-white/10 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white">Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className=" rounded-lg overflow-hidden">
                <iframe
                  title="preview"
                  sandbox=""
                  srcDoc={generatedHtml}
                  className="w-full h-[600px]"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
