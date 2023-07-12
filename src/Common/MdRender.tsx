import React from 'react';
import ReactMarkdown from 'react-markdown';

export function Markdown({
  source,
  className,
}: {
  source: string;
  className?: string;
}): JSX.Element {
  return (
    <ReactMarkdown
      className={className}
      components={{
        blockquote: ({ children }) => (
          <div className="pl-4 border-l-4 border-gray-500 text-gray-700 mb-4 mt-4">{children}</div>
        ),
        pre: ({ children }) => (
          <pre className="bg-gray-100 font-mono text-xs rounded-md mb-4 mt-4 py-3 px-4 overflow-x-scroll">
            <code>{children}</code>
          </pre>
        ),
        h1: ({ children }) => <h1 className="font-extrabold text-3xl mb-2">{children}</h1>,
        h2: ({ children }) => <h2 className="font-extrabold text-2xl mb-2 mt-4">{children}</h2>,
        h3: ({ children }) => <h3 className="font-bold text-xl mb-1 mt-3">{children}</h3>,
        code: ({ children }) => (
          <code className="font-mono bg-gray-200 p-1 text-xs rounded-sm">{children}</code>
        ),
        link: ({ href, children }) => (
          <a href={href} className="underline text-green-600">
            {children}
          </a>
        ),
        ol: ({ children }) => <ol className="pl-2 mt-2 mb-2 list-decimal list-inside">{children}</ol>,
        ul: ({ children }) => <ul className="pl-2 mt-2 mb-2 list-disc list-inside">{children}</ul>,
        li: ({ children }) => <li className="mb-1">{children}</li>,
        p: ({ children }) => <p className="mb-2">{children}</p>,
      }}
    >
      {source}
    </ReactMarkdown>
  );
}
