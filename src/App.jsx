import Generator from "./pages/Generator";
import { Toaster } from "@/components/ui/sonner";
import Dark from "@/components/background/dark";

function App() {
  return (
    <>
      <div className="fixed inset-0 -z-20 bg-[#06020f]"></div>
      <div className="fixed inset-0 -z-10 ">
        <Dark />
      </div>
      {/* Main Content */}
      <div className="relative z-10">
        <Generator />
      </div>
      {/* Notification */}
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
