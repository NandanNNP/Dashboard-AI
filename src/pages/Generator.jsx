import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Sparkles, Database, MessageSquare, Layout, MonitorPlay, Globe, Smartphone, Tablet, Monitor, Code, Download, Copy, Check, RotateCcw } from "lucide-react";
import TextType from "@/components/ui/text/typing";

export default function Generator() {
  const [jsonInput, setJsonInput] = useState("");
  const [userInstruction, setUserInstruction] = useState("");
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewWidth, setPreviewWidth] = useState("100%");
  const [activeTab, setActiveTab] = useState("preview");
  const [refineInstruction, setRefineInstruction] = useState("");
  const [copied, setCopied] = useState(false);

  const validateJSON = (input) => {
    try {
      JSON.parse(input);
      return true;
    } catch {
      return false;
    }
  };

  const generateDashboard = async (isRefinement = false) => {
    const instruction = isRefinement ? refineInstruction : userInstruction;

    if (!jsonInput.trim() || !instruction.trim()) {
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
        body: JSON.stringify({
          jsonInput,
          userInstruction: instruction,
          previousHtml: isRefinement ? generatedHtml : undefined
        }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      setGeneratedHtml(data.html);
      if (isRefinement) setRefineInstruction("");

      toast.success(isRefinement ? "Dashboard refined successfully." : "Dashboard generated successfully.");
    } catch {
      toast.error("Something went wrong while generating the dashboard.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadHtml = () => {
    const blob = new Blob([generatedHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dashboard.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Dashboard exported successfully!");
  };

  const loadTemplate = (template) => {
    setJsonInput(JSON.stringify(template.json, null, 2));
    setUserInstruction(template.instruction);
    toast.info(`Loaded ${template.name} template`);
  };

  const templates = [
    {
      name: "Sales Overview",
      instruction: "Create a modern sales dashboard with a hero metric, a bar chart for monthly sales, and a table of top products.",
      json: {
        total_revenue: "$124,500",
        growth: "+12.5%",
        monthly_sales: [
          { month: "Jan", sales: 12000 },
          { month: "Feb", sales: 15000 },
          { month: "Mar", sales: 18000 }
        ],
        top_products: [
          { name: "Product A", revenue: "$45,000" },
          { name: "Product B", revenue: "$32,000" }
        ]
      }
    },
    {
      name: "User Analytics",
      instruction: "Design a user analytics dashboard showing active users, retention rate, and a breakdown of user demographics.",
      json: {
        active_users: "12,450",
        retention_rate: "85%",
        demographics: {
          "18-24": "25%",
          "25-34": "45%",
          "35-44": "20%",
          "45+": "10%"
        },
        device_usage: {
          mobile: "65%",
          desktop: "30%",
          tablet: "5%"
        }
      }
    }
  ];

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
          <p className="text-xl text-white/60 max-w-2xl mx-auto min-h-[1.5em]">
            <TextType 
              text={[
                "Turn raw JSON into insights",
                "Powered by intelligent prompts",
                "Visualize anything. Instantly!"
              ]}
              typingSpeed={75}
              pauseDuration={2000}
              showCursor
              cursorCharacter="_"
              deletingSpeed={50}
              cursorBlinkDuration={0.5}
            />
          </p>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12">
          {/* Input section */}
          <Card className="lg:col-span-5 shadow-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:border-white/20">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="text-white flex items-center gap-2">
                <Layout className="h-5 w-5 text-indigo-400" />
                Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/80">
                    <Database className="h-4 w-4 text-blue-400" />
                    <label className="text-sm font-semibold tracking-wide uppercase">JSON Data</label>
                  </div>
                  <div className="flex gap-2">
                    {templates.map((t) => (
                      <button
                        key={t.name}
                        onClick={() => loadTemplate(t)}
                        className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 transition-colors"
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>
                </div>
                <Textarea
                  className="font-mono text-white bg-black/20 border-white/10 focus:border-indigo-500/50 focus:ring-indigo-500/20 transition-all duration-200"
                  rows={10}
                  placeholder='{ "data": [...] }'
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white/80">
                  <MessageSquare className="h-4 w-4 text-purple-400" />
                  <label className="text-sm font-semibold tracking-wide uppercase">Initial Instruction</label>
                </div>
                <Input
                  className="text-white h-12 bg-black/20 border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all duration-200"
                  placeholder="e.g. Create a sales analytics dashboard"
                  value={userInstruction}
                  onChange={(e) => setUserInstruction(e.target.value)}
                />
              </div>

              <Button
                onClick={() => generateDashboard(false)}
                className="w-full h-12 text-base font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white border-0 shadow-lg shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:hover:scale-100"
                disabled={loading}
              >
                {loading && !refineInstruction ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Crafting...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate New Dashboard
                  </>
                )}
              </Button>

              {generatedHtml && (
                <div className="pt-6 border-t border-white/10 space-y-4">
                   <div className="flex items-center gap-2 text-white/80">
                    <RotateCcw className="h-4 w-4 text-pink-400" />
                    <label className="text-sm font-semibold tracking-wide uppercase">Refine Result</label>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      className="text-white bg-black/20 border-white/10 focus:border-pink-500/50 focus:ring-pink-500/20 transition-all duration-200"
                      placeholder="e.g. Change the color to blue..."
                      value={refineInstruction}
                      onChange={(e) => setRefineInstruction(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && generateDashboard(true)}
                    />
                    <Button
                      size="icon"
                      onClick={() => generateDashboard(true)}
                      disabled={loading || !refineInstruction.trim()}
                      className="shrink-0 bg-pink-600 hover:bg-pink-500"
                    >
                      {loading && refineInstruction ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preview section */}
          <Card className="lg:col-span-7 shadow-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col overflow-hidden">
            <CardHeader className="border-b border-white/10 py-4">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex items-center gap-2 cursor-pointer transition-colors ${activeTab === "preview" ? "text-white" : "text-white/40 hover:text-white/60"}`}
                    onClick={() => setActiveTab("preview")}
                  >
                    <MonitorPlay className="h-4 w-4" />
                    <span className="text-sm font-medium">Preview</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 cursor-pointer transition-colors ${activeTab === "code" ? "text-white" : "text-white/40 hover:text-white/60"}`}
                    onClick={() => setActiveTab("code")}
                  >
                    <Code className="h-4 w-4" />
                    <span className="text-sm font-medium">Code</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                   {generatedHtml && (
                    <div className="flex items-center gap-2 mr-4 pr-4 border-r border-white/10">
                      <button
                        onClick={copyToClipboard}
                        className="p-1.5 rounded-md hover:bg-white/5 text-white/60 hover:text-white transition-all"
                        title="Copy Code"
                      >
                        {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={downloadHtml}
                        className="p-1.5 rounded-md hover:bg-white/5 text-white/60 hover:text-white transition-all"
                        title="Download HTML"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                   )}
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/50" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                    <div className="h-3 w-3 rounded-full bg-green-500/50" />
                  </div>
                </div>
              </div>
            </CardHeader>

            <div className="px-6 py-3 border-b border-white/5 bg-black/20 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1">
                <div className="flex gap-2">
                  <div className="h-1.5 w-6 rounded-full bg-white/10" />
                  <div className="h-1.5 w-6 rounded-full bg-white/10" />
                </div>
                <div className="flex-1 max-w-md h-7 rounded-md bg-white/5 border border-white/10 flex items-center px-3 gap-2">
                  <Globe className="h-3 w-3 text-white/30" />
                  <div className="h-2 w-32 rounded-full bg-white/10" />
                </div>
              </div>

              {activeTab === "preview" && (
                <div className="flex items-center bg-white/5 rounded-lg p-1 border border-white/10">
                  <button
                    onClick={() => setPreviewWidth("100%")}
                    className={`p-1.5 rounded-md transition-all ${previewWidth === "100%" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"}`}
                  >
                    <Monitor className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setPreviewWidth("768px")}
                    className={`p-1.5 rounded-md transition-all ${previewWidth === "768px" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"}`}
                  >
                    <Tablet className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setPreviewWidth("375px")}
                    className={`p-1.5 rounded-md transition-all ${previewWidth === "375px" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"}`}
                  >
                    <Smartphone className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>

            <CardContent className="flex-1 p-0 relative min-h-[600px] bg-black/40 overflow-hidden">
              {generatedHtml ? (
                activeTab === "preview" ? (
                  <div className="w-full h-full flex justify-center bg-black/20 transition-all duration-300">
                    <iframe
                      title="preview"
                      sandbox="allow-scripts"
                      srcDoc={generatedHtml}
                      style={{ width: previewWidth }}
                      className="h-full border-x border-white/5 bg-white transition-all duration-300"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full p-6 font-mono text-sm text-white/80 overflow-auto">
                    <pre className="whitespace-pre-wrap">{generatedHtml}</pre>
                  </div>
                )
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
