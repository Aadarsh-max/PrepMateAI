import React, { useState } from "react";
import { LuCopy, LuCheck, LuCode } from "react-icons/lu";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighLighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const AIResponsePreview = ({ content }) => {
  if (!content) return null;
  return (
    <div className="max-w-4xl mx-auto bg-black text-white">
      <div className="text-[14px] prose prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const language = match ? match[1] : "";
              const isInline = !className;

              return !isInline ? (
                <CodeBlock
                  code={String(children).replace(/\n$/, "")}
                  language={language}
                  className="bg-white text-black rounded px-2 py-1 font-mono"
                />
              ) : (
                <code
                  className="px-1 py-0.5 bg-white text-black rounded text-sm"
                  {...props}
                >
                  {children}
                </code>
              );
            },
            p({ children }) {
              return <p className="mb-4 leading-6 text-white">{children}</p>;
            },
            strong({ children }) {
              return (
                <strong className="font-semibold text-white">{children}</strong>
              );
            },
            em({ children }) {
              return <em className="italic text-gray-300">{children}</em>;
            },
            ul({ children }) {
              return (
                <ul className="list-disc pl-6 space-y-2 my-4 text-white">
                  {children}
                </ul>
              );
            },
            ol({ children }) {
              return (
                <ol className="list-decimal pl-6 space-y-2 my-4 text-white">
                  {children}
                </ol>
              );
            },
            li({ children }) {
              return <li className="mb-1">{children}</li>;
            },
            blockquote({ children }) {
              return (
                <blockquote className="border-l-4 border-white pl-4 italic my-4 text-gray-300">
                  {children}
                </blockquote>
              );
            },
            h1({ children }) {
              return (
                <h1 className="text-2xl font-bold mt-6 mb-4 text-white">
                  {children}
                </h1>
              );
            },
            h2({ children }) {
              return (
                <h2 className="text-xl font-bold mt-6 mb-3 text-white">
                  {children}
                </h2>
              );
            },
            h3({ children }) {
              return (
                <h3 className="text-lg font-bold mt-5 mb-2 text-white">
                  {children}
                </h3>
              );
            },
            h4({ children }) {
              return (
                <h4 className="text-base font-bold mt-4 mb-2 text-white">
                  {children}
                </h4>
              );
            },
            a({ children, href }) {
              return (
                <a
                  href={href}
                  className="text-white underline hover:text-gray-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              );
            },
            table({ children }) {
              return (
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full divide-y divide-gray-700 border border-gray-700">
                    {children}
                  </table>
                </div>
              );
            },
            thead({ children }) {
              return <thead className="bg-gray-900">{children}</thead>;
            },
            tbody({ children }) {
              return (
                <tbody className="divide-y divide-gray-700">{children}</tbody>
              );
            },
            tr({ children }) {
              return <tr>{children}</tr>;
            },
            th({ children }) {
              return (
                <th className="px-3 py-2 text-left text-xs font-medium text-white uppercase tracking-wider">
                  {children}
                </th>
              );
            },
            td({ children }) {
              return (
                <td className="px-3 py-2 whitespace-nowrap text-sm text-white">
                  {children}
                </td>
              );
            },
            hr() {
              return <hr className="my-6 border-white" />;
            },
            img({ src, alt }) {
              return (
                <img
                  src={src}
                  alt={alt}
                  className="my-4 max-w-full rounded border border-white"
                />
              );
            },
            button({ children, ...props }) {
              return (
                <button
                  className="bg-white text-black px-3 py-1 rounded cursor-pointer hover:bg-gray-300"
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

function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 rounded border border-white bg-black">
      <div className="flex items-center justify-between px-3 py-2 border-b border-white">
        <span className="text-xs text-white uppercase tracking-wide">
          {language || "Code"}
        </span>
        <button
          onClick={copyCode}
          className="text-white text-xs px-2 py-1 border border-white rounded hover:bg-white hover:text-black transition"
          aria-label="Copy code"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <SyntaxHighLighter
        language={language}
        style={{
          hljs: {
            background: "black",
            color: "white",
          },
        }}
        customStyle={{
          fontSize: 12.5,
          margin: 0,
          padding: "1rem",
          background: "black",
          color: "white",
        }}
      >
        {code}
      </SyntaxHighLighter>
    </div>
  );
}

export default AIResponsePreview;
