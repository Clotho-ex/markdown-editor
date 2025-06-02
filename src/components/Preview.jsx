import { useMarkdownStore } from "../store/useMarkdownStore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkExternalLinks from "remark-external-links";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { FiCopy } from "react-icons/fi";

const Preview = () => {
  const { markdown } = useMarkdownStore();

  // Recursive function to extract plain text from React elements
  const extractTextFromChildren = (children) => {
    if (typeof children === "string") {
      return children;
    }

    if (Array.isArray(children)) {
      return children.map(extractTextFromChildren).join("");
    }

    if (children?.props?.children) {
      return extractTextFromChildren(children.props.children);
    }

    return "";
  };

  const components = {
    // Custom blockquote with better styling
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 bg-blue-50 p-4 italic dark:bg-blue-900/20">
        {children}
      </blockquote>
    ),

    // Custom headings with better styling
    h1: ({ children, id }) => (
      <h1 id={id} className="group scroll-mt-20">
        {children}
        {id && (
          <a
            href={`#${id}`}
            className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100"
            aria-label="Link to this heading"
          >
            #
          </a>
        )}
      </h1>
    ),
    h2: ({ children, id }) => (
      <h2 id={id} className="group scroll-mt-20">
        {children}
        {id && (
          <a
            href={`#${id}`}
            className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100"
            aria-label="Link to this heading"
          >
            #
          </a>
        )}
      </h2>
    ),
    h3: ({ children, id }) => (
      <h3 id={id} className="group scroll-mt-20">
        {children}
        {id && (
          <a
            href={`#${id}`}
            className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100"
            aria-label="Link to this heading"
          >
            #
          </a>
        )}
      </h3>
    ),

    // Custom code blocks with copy button
    pre: ({ children }) => {
      const codeContent = extractTextFromChildren(children);

      return (
        <div className="group relative">
          <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm">
            {children}
          </pre>
          <button
            className="absolute top-2 right-2 cursor-pointer rounded bg-gray-700 p-2 text-white opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-gray-600 active:bg-gray-500"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(codeContent);
                console.log("Code copied to clipboard!");
              } catch (err) {
                console.error("Failed to copy code:", err);
              }
            }}
            aria-label="Copy code to clipboard"
          >
            <FiCopy size={16} />
          </button>
        </div>
      );
    },

    // Enhanced tables
    table: ({ children }) => (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          {children}
        </table>
      </div>
    ),
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-shrink-0 bg-slate-800 p-4">
        <p className="font-mono font-bold tracking-widest text-slate-200">
          Preview
        </p>
      </div>
      <div className="flex-1 overflow-y-auto bg-stone-50 p-4 dark:bg-slate-900">
        <article className="prose prose-lg prose-neutral dark:prose-invert prose-headings:scroll-mt-20 prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none text-slate-800 dark:text-slate-200">
          <ReactMarkdown
            remarkPlugins={[
              remarkGfm,
              remarkMath,
              [
                remarkExternalLinks,
                { target: "_blank", rel: "noopener noreferrer" },
              ],
            ]}
            rehypePlugins={[
              rehypeSlug,
              rehypeRaw,
              rehypeHighlight,
              rehypeKatex,
            ]}
            components={components}
          >
            {markdown}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
};

export default Preview;
