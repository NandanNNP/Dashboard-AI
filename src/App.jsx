import Generator from "./pages/Generator";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Generator />
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;