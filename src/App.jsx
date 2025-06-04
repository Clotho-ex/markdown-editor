import "./App.css";
import Header from "./components/Header";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import { useUIStore } from "./store/useUIStore";
import { useMarkdownStore } from "./store/useMarkdownStore";
import { useEffect } from "react";

function App() {
  const { preview, setPreview } = useMarkdownStore();
  const { theme } = useUIStore();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "s":
            e.preventDefault();
            document.querySelector('[aria-label="Download"]')?.click();
            break;
          case "p":
            e.preventDefault();
            setPreview(!preview);
            break;
          case "/":
            e.preventDefault();
            document.getElementById("markdown-editor")?.focus();
            break;
        }
      }
      if (e.key === "Escape" && window.innerWidth < 768) {
        setPreview(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [preview, setPreview]);

  return (
    <div
      className={`${theme} flex h-screen flex-col bg-stone-50 transition-colors duration-300 dark:bg-slate-900`}
    >
      <Header />
      <main className="flex flex-1 flex-col md:flex-row">
        <section className={`flex-1 ${preview ? "hidden" : "block"} md:block`}>
          <Editor />
        </section>
        <section className={`flex-1 ${preview ? "block" : "hidden"} md:block`}>
          <Preview />
        </section>
      </main>
    </div>
  );
}

export default App;
