import { useCallback, useEffect, useMemo, useRef } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

const Pre = ({
  children,
  copiedCodeBlocks,
  setCopiedCodeBlocks,
  copyTimeouts,
}) => {
  const preRef = useRef(null);
  const blockId = useMemo(
    () => `block-${Math.random().toString(36).slice(2)}`,
    [],
  );
  const isCopied = copiedCodeBlocks.get(blockId);

  const handleCopyCode = useCallback(async () => {
    const codeContent = preRef.current?.textContent || "";
    try {
      await navigator.clipboard.writeText(codeContent);
      setCopiedCodeBlocks((prev) => new Map(prev.set(blockId, true)));

      if (copyTimeouts.current.has(blockId)) {
        clearTimeout(copyTimeouts.current.get(blockId));
      }

      const timeoutId = setTimeout(() => {
        setCopiedCodeBlocks((prev) => {
          const newMap = new Map(prev);
          newMap.delete(blockId);
          return newMap;
        });
        copyTimeouts.current.delete(blockId);
      }, 2000);

      copyTimeouts.current.set(blockId, timeoutId);
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error("Copy failed:", err);
      }
    }
  }, [blockId]);

  return (
    <div className="group relative">
      <pre
        ref={preRef}
        className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm"
      >
        {children}
      </pre>
      <button
        onClick={handleCopyCode}
        aria-label={isCopied ? "Code copied!" : "Copy code"}
        title={isCopied ? "Copied!" : "Copy"}
        className={`absolute top-2 right-2 rounded p-2 text-white opacity-0 transition-all duration-200 group-hover:opacity-100 focus:opacity-100 ${
          isCopied
            ? "bg-green-600 hover:bg-green-500"
            : "bg-gray-700 hover:bg-gray-600 active:bg-gray-500"
        }`}
      >
        {isCopied ? <FiCheck size={16} /> : <FiCopy size={16} />}
      </button>
    </div>
  );
};

export default Pre;
