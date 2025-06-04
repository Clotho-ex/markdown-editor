import React, { useRef, useEffect } from "react";
import { useMarkdownStore } from "../store/useMarkdownStore";
import { useFilenameStore } from "../store/useFilenameStore";
import { FiEye, FiEyeOff, FiDownload } from "react-icons/fi";

const DEFAULT_FILENAME = "Untitled.md";

const Header = () => {
  const { preview, setPreview, markdown } = useMarkdownStore();

  // Zustand filename store
  const {
    filename,
    editing,
    tempName,
    setTempName,
    startEditing,
    saveFilename,
    cancelEditing,
    justEdited,
    setJustEdited,
  } = useFilenameStore();

  const inputRef = useRef(null);
  const h1Ref = useRef(null);

  // Auto-focus input when editing starts
  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  // Flash highlight when filename is edited
  useEffect(() => {
    if (justEdited && h1Ref.current) {
      h1Ref.current.classList.add("animate-flash");
      setJustEdited(false);
    }
  }, [justEdited, setJustEdited]);

  // Download logic with fallback
  const handleDownload = () => {
    let name = filename?.trim() || DEFAULT_FILENAME;
    if (!name.endsWith(".md")) name += ".md";

    const blob = new Blob([markdown], { type: "text/markdown" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // Clean up
    setTimeout(() => URL.revokeObjectURL(link.href), 100);
  };

  // Save file name on Enter, cancel on Escape
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      saveFilename();
    } else if (e.key === "Escape") {
      cancelEditing();
    }
  };

  return (
    <>
      <header className="flex min-h-[60px] items-center justify-between bg-white px-3 py-3 shadow-md shadow-stone-300 sm:min-h-[65px] sm:px-4 sm:py-3 lg:min-h-[70px] lg:px-6 lg:py-4 dark:bg-slate-900 dark:shadow-slate-700">
        {/* Editable Filename as h1 */}
        <div className="flex items-center">
          {!editing ? (
            <h1
              ref={h1Ref}
              className="focus-ring cursor-pointer rounded border border-dashed border-slate-600 px-1 text-lg font-bold text-slate-900 transition duration-500 select-none hover:cursor-text focus:border-none dark:text-slate-200"
              tabIndex={0}
              onClick={startEditing}
              role="button"
              aria-label="Edit markdown file name"
              title="Click to edit file name"
            >
              {filename || DEFAULT_FILENAME}
            </h1>
          ) : (
            <input
              ref={inputRef}
              className="w-50 rounded-xl bg-transparent px-1 text-lg font-bold text-slate-900 outline-none selection:bg-slate-300 dark:text-slate-200 dark:selection:bg-slate-700"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onBlur={saveFilename}
              onKeyDown={handleInputKeyDown}
              aria-label="Markdown file name"
              spellCheck={false}
              maxLength={15}
            />
          )}
        </div>
        <nav className="flex items-center gap-3">
          {/* Eye Icon for Mobile View */}
          <button
            className="text-slate-900 transition-colors hover:text-slate-900 md:hidden dark:text-slate-200 dark:hover:text-slate-200"
            aria-label={preview ? "Show Editor" : "Show Preview"}
            onClick={() => setPreview(!preview)}
          >
            {preview ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
          {/* Download Icon */}
          <button
            aria-label="Download"
            className="focus-ring ml-2 cursor-pointer rounded-sm text-slate-900 transition-colors hover:text-slate-900 dark:text-slate-200 dark:hover:text-slate-200"
            onClick={handleDownload}
          >
            <FiDownload size={22} />
          </button>
        </nav>
      </header>
    </>
  );
};

export default React.memo(Header);
