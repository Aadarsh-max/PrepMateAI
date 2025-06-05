import React, { useState } from "react";
import { LuCopy, LuCheck } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

// Code block with copy button and light style
function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 sm:my-6 rounded-md border border-gray-200 bg-[#f9f9f9] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-gray-100 border-b border-gray-200">
        <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">
          {language || "Code"}
        </span>
        <button
          onClick={copyCode}
          className="text-xs px-2 py-1 border border-gray-400 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
        >
          {copied ? (
            <span className="flex items-center gap-1">
              <LuCheck className="inline" /> <span className="hidden sm:inline">Copied</span>
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <LuCopy className="inline" /> <span className="hidden sm:inline">Copy</span>
            </span>
          )}
        </button>
      </div>

      {/* Code section */}
      <div className="overflow-x-auto text-xs sm:text-sm">
        <SyntaxHighlighter
          language={language}
          style={oneLight}
          customStyle={{
            margin: 0,
            padding: "0.75rem 1rem",
            backgroundColor: "#f9f9f9",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

// AI Response Markdown Preview
const AIResponsePreview = ({ content }) => {
  if (!content) return null;
  return (
    <div className="max-w-4xl mx-auto bg-white text-black px-4 sm:px-6 lg:px-8">
      <div className="text-sm sm:text-base prose max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "";
              const isInline = !(
                className && className.startsWith("language-")
              );

              return !isInline ? (
                <CodeBlock
                  code={String(children).replace(/\n$/, "")}
                  language={language}
                />
              ) : (
                <code
                  className="px-1 py-0.5 bg-gray-200 text-black rounded text-xs sm:text-sm"
                  {...props}
                >
                  {children}
                </code>
              );
            },
            p({ children }) {
              return <p className="mb-3 sm:mb-4 leading-6 text-black">{children}</p>;
            },
            strong({ children }) {
              return (
                <strong className="font-semibold text-black">{children}</strong>
              );
            },
            em({ children }) {
              return <em className="italic text-gray-600">{children}</em>;
            },
            ul({ children }) {
              return (
                <ul className="list-disc pl-5 sm:pl-6 space-y-1 sm:space-y-2 my-3 sm:my-4 text-black">
                  {children}
                </ul>
              );
            },
            ol({ children }) {
              return (
                <ol className="list-decimal pl-5 sm:pl-6 space-y-1 sm:space-y-2 my-3 sm:my-4 text-black">
                  {children}
                </ol>
              );
            },
            li({ children }) {
              return <li className="mb-1">{children}</li>;
            },
            blockquote({ children }) {
              return (
                <blockquote className="border-l-4 border-gray-400 pl-3 sm:pl-4 italic my-3 sm:my-4 text-gray-600">
                  {children}
                </blockquote>
              );
            },
            h1({ children }) {
              return (
                <h1 className="text-xl sm:text-2xl font-bold mt-4 sm:mt-6 mb-3 sm:mb-4 text-black">
                  {children}
                </h1>
              );
            },
            h2({ children }) {
              return (
                <h2 className="text-lg sm:text-xl font-bold mt-4 sm:mt-6 mb-2 sm:mb-3 text-black">
                  {children}
                </h2>
              );
            },
            h3({ children }) {
              return (
                <h3 className="text-base sm:text-lg font-bold mt-3 sm:mt-5 mb-2 text-black">
                  {children}
                </h3>
              );
            },
            h4({ children }) {
              return (
                <h4 className="text-sm sm:text-base font-bold mt-3 sm:mt-4 mb-2 text-black">
                  {children}
                </h4>
              );
            },
            a({ children, href }) {
              return (
                <a
                  href={href}
                  className="text-blue-600 underline hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              );
            },
            table({ children }) {
              return (
                <div className="overflow-x-auto my-3 sm:my-4">
                  <table className="min-w-full divide-y divide-gray-300 border border-gray-300">
                    {children}
                  </table>
                </div>
              );
            },
            thead({ children }) {
              return <thead className="bg-gray-100">{children}</thead>;
            },
            tbody({ children }) {
              return (
                <tbody className="divide-y divide-gray-300">{children}</tbody>
              );
            },
            tr({ children }) {
              return <tr>{children}</tr>;
            },
            th({ children }) {
              return (
                <th className="px-2 sm:px-3 py-2 text-left text-xs font-medium text-black uppercase tracking-wider">
                  {children}
                </th>
              );
            },
            td({ children }) {
              return (
                <td className="px-2 sm:px-3 py-2 whitespace-nowrap text-xs sm:text-sm text-black">
                  {children}
                </td>
              );
            },
            hr() {
              return <hr className="my-4 sm:my-6 border-gray-300" />;
            },
            img({ src, alt }) {
              return (
                <img
                  src={src}
                  alt={alt}
                  className="my-3 sm:my-4 max-w-full rounded border border-gray-300"
                />
              );
            },
            button({ children, ...props }) {
              return (
                <button
                  className="bg-gray-200 text-black px-2 sm:px-3 py-1 rounded cursor-pointer hover:bg-gray-300 text-xs sm:text-sm"
                  {...props}
                >
                  {children}
                </button>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default AIResponsePreview;