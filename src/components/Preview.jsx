import { useState, useEffect, useMemo, useRef } from "react";
import debounce from "lodash.debounce";
import { useMarkdownStore } from "../store/useMarkdownStore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkBreaks from "remark-breaks";
import remarkExternalLinks from "remark-external-links";
import rehypeKatex from "rehype-katex";
import rehypeSanitize from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import Pre from "./Pre";

const Preview = () => {
  const { markdown } = useMarkdownStore();
  const [debouncedMarkdown, setDebouncedMarkdown] = useState(markdown);
  const [copiedCodeBlocks, setCopiedCodeBlocks] = useState(new Map());
  const copyTimeouts = useRef(new Map());
  const [isProcessing, setIsProcessing] = useState(false);

  const debouncedSetMarkdown = useMemo(() => {
    return debounce((value) => {
      setDebouncedMarkdown(value);
      setIsProcessing(false);
    }, 300);
  }, []);

  useEffect(() => {
    setIsProcessing(true);
    debouncedSetMarkdown(markdown);
    return () => debouncedSetMarkdown.cancel();
  }, [markdown, debouncedSetMarkdown]);

  useEffect(() => {
    return () => {
      copyTimeouts.current.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  const Heading = ({ children, id, tag: Tag }) => (
    <Tag id={id} className="group scroll-mt-20">
      {children}
      {id && (
        <a
          href={`#${id}`}
          className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100"
        >
          #
        </a>
      )}
    </Tag>
  );

  const components = useMemo(
    () => ({
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-blue-500 bg-blue-50 p-4 italic dark:bg-blue-900/20">
          {children}
        </blockquote>
      ),
      h1: (props) => <Heading {...props} tag="h1" />,
      h2: (props) => <Heading {...props} tag="h2" />,
      h3: (props) => <Heading {...props} tag="h3" />,
      pre: (props) => (
        <Pre
          {...props}
          copiedCodeBlocks={copiedCodeBlocks}
          setCopiedCodeBlocks={setCopiedCodeBlocks}
          copyTimeouts={copyTimeouts}
        />
      ),
      table: ({ children }) => (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            {children}
          </table>
        </div>
      ),
    }),
    [copiedCodeBlocks],
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex-shrink-0 bg-stone-200 p-4 dark:bg-slate-800">
        <div className="flex items-center justify-between">
          <p className="font-mono font-bold tracking-widest text-slate-900 dark:text-slate-200">
            Preview
          </p>
          {isProcessing && (
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Processing...
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-stone-50 p-4 dark:bg-slate-900">
        <article className="prose prose-lg prose-neutral dark:prose-invert prose-headings:scroll-mt-20 prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none text-slate-800 dark:text-slate-200">
          <ReactMarkdown
            remarkPlugins={[
              remarkGfm,
              remarkMath,
              remarkBreaks,
              [
                remarkExternalLinks,
                { target: "_blank", rel: "noopener noreferrer" },
              ],
            ]}
            rehypePlugins={[
              rehypeSlug,
              rehypeHighlight,
              rehypeKatex,
              rehypeSanitize,
            ]}
            components={components}
          >
            {debouncedMarkdown}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
};

export default Preview;
