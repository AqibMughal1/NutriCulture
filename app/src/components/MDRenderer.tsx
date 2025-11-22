import ReactMarkdown, { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";

export function MDRenderer({ content }: { content: string }) {
  return (
    <div className="mx-2 overflow-hidden px-3 py-2 text-sm">
      <div className="prose prose-sm dark:prose-invert max-w-3xl">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={
            {
              // Override default element styling
              p: ({ ...props }) => <p className="mb-4 last:mb-0" {...props} />,
              h1: ({ ...props }) => (
                <h1 className="mb-6 mt-8 text-3xl font-bold" {...props} />
              ),
              h2: ({ ...props }) => (
                <h2 className="mb-5 mt-7 text-2xl font-bold" {...props} />
              ),
              h3: ({ ...props }) => (
                <h3 className="mb-4 mt-6 text-xl font-bold" {...props} />
              ),
              h4: ({ ...props }) => (
                <h4 className="mb-3 mt-5 text-lg font-bold" {...props} />
              ),
              h5: ({ ...props }) => (
                <h5 className="mb-3 mt-4 text-lg font-bold" {...props} />
              ),
              h6: ({ ...props }) => (
                <h6 className="mb-3 mt-4 font-bold" {...props} />
              ),
              ul: ({ ...props }) => (
                <ul className="mb-4 list-disc pl-4" {...props} />
              ),
              ol: ({ ...props }) => (
                <ol className="mb-4 list-decimal pl-4" {...props} />
              ),
              li: ({ ...props }) => <li className="mb-1" {...props} />,
              a: ({ ...props }) => (
                <a className="text-blue-500 hover:underline" {...props} />
              ),
              blockquote: ({ ...props }) => (
                <blockquote
                  className="my-4 border-l-4 border-gray-300 pl-4 italic"
                  {...props}
                />
              ),
              code: ({ className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <div className="relative my-4 rounded-md overflow-hidden">
                    <div className="absolute right-2 top-2 z-10 rounded bg-black/30 px-2 py-0.5 text-xs text-gray-200">
                      {match[1]}
                    </div>
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      wrapLongLines={true}
                      PreTag="div"
                      customStyle={{
                        margin: 0,
                        borderRadius: "0.375rem",
                        fontSize: "0.875rem",
                      }}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code
                    className="rounded bg-gray-200 px-1 dark:bg-gray-700"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
            } as Components
          }
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
