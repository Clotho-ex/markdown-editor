import { memo, useCallback } from "react";
import { useMarkdownStore } from "../store/useMarkdownStore";

const Editor = memo(() => {
  const { markdown, setMarkdown } = useMarkdownStore();

  const handleChange = useCallback(
    (e) => {
      setMarkdown(e.target.value);
    },
    [setMarkdown],
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex-shrink-0 border-r-2 border-slate-600 bg-stone-200 p-4 dark:bg-slate-800">
        <p className="font-mono font-bold tracking-widest text-slate-900 dark:text-slate-200">
          Markdown
        </p>
      </div>
      <textarea
        id="markdown-editor"
        value={markdown}
        onChange={handleChange}
        placeholder="Type your markdown here..."
        spellCheck={false}
        aria-label="Markdown Editor"
        className="flex-1 resize-none border-r-2 border-slate-600 bg-white p-4 font-mono text-slate-800 focus:outline-none dark:bg-slate-900 dark:text-slate-200"
      />
    </div>
  );
});

export default Editor;
