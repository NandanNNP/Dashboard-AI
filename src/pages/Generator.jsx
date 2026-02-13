import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function Generator() {
  const [jsonInput, setJsonInput] = useState("");
  const [userInstruction, setUserInstruction] = useState("");
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [loading, setLoading] = useState(false);

  const generateDashboard = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jsonInput, userInstruction }),
      });

      const data = await response.json();
      setGeneratedHtml(data.html);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* INPUT SECTION */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Dashboard Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">

            <div>
              <label className="text-sm font-medium">JSON Data</label>
              <Textarea
                rows={10}
                placeholder="Paste JSON here..."
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Instruction</label>
              <Input
                placeholder="Describe how the dashboard should look..."
                value={userInstruction}
                onChange={(e) => setUserInstruction(e.target.value)}
              />
            </div>

            <Button 
              onClick={generateDashboard} 
              className="w-full"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Dashboard"}
            </Button>
          </CardContent>
        </Card>

        {/* PREVIEW SECTION */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white rounded-lg border min-h-[500px] p-4 overflow-auto">
              <div
                dangerouslySetInnerHTML={{ __html: generatedHtml }}
              />
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}