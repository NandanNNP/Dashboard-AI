import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Sparkles, Database, MessageSquare, Layout, MonitorPlay, Globe } from "lucide-react";
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
    } catch {
      toast.error("Something went wrong while generating the dashboard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Heading section */}

        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center justify-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-blue-400" />
            <span className="text-xs font-medium text-blue-100 tracking-wider uppercase">AI-Powered Dashboarding</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Dashboard AI
            </span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
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


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
          {/* Input section */}
          <Card className="shadow-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:border-white/20">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="text-white flex items-center gap-2">
                <Layout className="h-5 w-5 text-indigo-400" />
                Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white/80">
                  <Database className="h-4 w-4 text-blue-400" />
                  <label className="text-sm font-semibold tracking-wide uppercase">JSON Data</label>
                </div>
                <Textarea
                  className="font-mono text-white bg-black/20 border-white/10 focus:border-indigo-500/50 focus:ring-indigo-500/20 transition-all duration-200"
                  rows={14}
                  placeholder='{ "data": [...] }'
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white/80">
                  <MessageSquare className="h-4 w-4 text-purple-400" />
                  <label className="text-sm font-semibold tracking-wide uppercase">Instruction</label>
                </div>
                <Input
                  className="text-white h-12 bg-black/20 border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all duration-200"
                  placeholder="e.g. Create a sales analytics dashboard with charts"
                  value={userInstruction}
                  onChange={(e) => setUserInstruction(e.target.value)}
                />
              </div>

              <Button
                onClick={generateDashboard}
                className="w-full h-12 text-base font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white border-0 shadow-lg shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:hover:scale-100"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Crafting your dashboard...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Dashboard
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Preview section */}
          <Card className="shadow-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col overflow-hidden">
            <CardHeader className="border-b border-white/10 py-4">
              <div className="flex items-center justify-between w-full">
                <CardTitle className="text-white flex items-center gap-2">
                  <MonitorPlay className="h-5 w-5 text-indigo-400" />
                  Live Preview
                </CardTitle>
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/50" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                  <div className="h-3 w-3 rounded-full bg-green-500/50" />
                </div>
              </div>
            </CardHeader>
            <div className="px-6 py-3 border-b border-white/5 bg-black/20 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="h-1.5 w-6 rounded-full bg-white/10" />
                <div className="h-1.5 w-6 rounded-full bg-white/10" />
              </div>
              <div className="flex-1 h-7 rounded-md bg-white/5 border border-white/10 flex items-center px-3 gap-2">
                <Globe className="h-3 w-3 text-white/30" />
                <div className="h-2 w-32 rounded-full bg-white/10" />
              </div>
            </div>
            <CardContent className="flex-1 p-0 relative min-h-[600px] bg-black/40">
              {generatedHtml ? (
                <iframe
                  title="preview"
                  sandbox="allow-scripts"
                  srcDoc={generatedHtml}
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 text-center p-8">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-indigo-500/20 rounded-full blur-xl animate-pulse" />
                    <MonitorPlay className="h-16 w-16 text-white/20 relative" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white/80">Ready to Visualize</h3>
                    <p className="text-sm text-white/40 max-w-[280px]">
                      Enter your data and instructions to generate a professional dashboard instantly.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
