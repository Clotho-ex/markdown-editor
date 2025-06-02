import "./App.css";
import Header from "./components/Header";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import { useUIStore } from "./store/useUIStore";
import { useMarkdownStore } from "./store/useMarkdownStore";

function App() {
  const { preview } = useMarkdownStore();
  const { theme, font, settingsOpen } = useUIStore();

  return (
    <div
      className={`${theme} ${font} flex h-screen flex-col bg-stone-50 transition-colors duration-300 dark:bg-slate-900`}
    >
      <Header />
      <main className="flex flex-1 flex-col md:flex-row">
        <section className={`flex-1 ${preview ? "hidden" : "block"} md:block`}>
          <Editor />
        </section>
        <section
          className={`flex-1 ${preview ? "block" : "hidden"} md:block`}
        >
          <Preview />
        </section>
      </main>
    </div>
  );
}

export default App;
