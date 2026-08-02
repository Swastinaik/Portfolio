import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Check, Copy, Info, AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';

interface PlanetScaleMarkdownRendererProps {
  content: string;
}

export const PlanetScaleMarkdownRenderer: React.FC<PlanetScaleMarkdownRendererProps> = ({ content }) => {
  return (
    <div className="planetscale-markdown font-sans text-[#fafafa] leading-[1.8] text-[15px]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // H1 Styling
          h1: ({ children }) => (
            <h1 className="text-2xl sm:text-3xl font-medium text-[#fafafa] tracking-tight mt-8 mb-6 pb-4 border-b border-[#262626] leading-tight">
              {children}
            </h1>
          ),
          // H2 Styling
          h2: ({ children }) => (
            <h2 className="text-xl sm:text-2xl font-medium text-[#fafafa] tracking-tight mt-10 mb-4 pb-2 border-b border-[#262626]">
              {children}
            </h2>
          ),
          // H3 Styling
          h3: ({ children }) => (
            <h3 className="text-base sm:text-lg font-medium text-[#fafafa] tracking-tight mt-6 mb-3">
              {children}
            </h3>
          ),
          // Paragraph
          p: ({ children }) => (
            <p className="text-[15px] leading-[1.85] text-[#d4d4d4] my-4">
              {children}
            </p>
          ),
          // Blockquote with GitHub Callout support
          blockquote: ({ children }) => {
            const extractText = (node: any): string => {
              if (!node) return '';
              if (typeof node === 'string') return node;
              if (Array.isArray(node)) return node.map(extractText).join('');
              if (node.props && node.props.children) return extractText(node.props.children);
              return '';
            };

            const rawText = extractText(children).trim();

            if (rawText.includes('[!NOTE]')) {
              return (
                <div className="my-6 p-4 border-l-2 border-[#3b82f6] bg-[#0f172a]/80 text-[#93c5fd] font-sans text-[14.5px] rounded-r border-t border-r border-b border-[#1e293b]">
                  <div className="flex items-center space-x-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#60a5fa] mb-1.5">
                    <Info className="w-3.5 h-3.5" />
                    <span>NOTE</span>
                  </div>
                  <div className="text-[#cbd5e1]">{children}</div>
                </div>
              );
            }
            if (rawText.includes('[!WARNING]')) {
              return (
                <div className="my-6 p-4 border-l-2 border-[#eab308] bg-[#1c1917]/80 text-[#fde047] font-sans text-[14.5px] rounded-r border-t border-r border-b border-[#292524]">
                  <div className="flex items-center space-x-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#facc15] mb-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>WARNING</span>
                  </div>
                  <div className="text-[#e7e5e4]">{children}</div>
                </div>
              );
            }
            if (rawText.includes('[!TIP]')) {
              return (
                <div className="my-6 p-4 border-l-2 border-[#10b981] bg-[#064e3b]/30 text-[#6ee7b7] font-sans text-[14.5px] rounded-r border-t border-r border-b border-[#065f46]/50">
                  <div className="flex items-center space-x-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#34d399] mb-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>PRO TIP</span>
                  </div>
                  <div className="text-[#a7f3d0]">{children}</div>
                </div>
              );
            }
            if (rawText.includes('[!IMPORTANT]')) {
              return (
                <div className="my-6 p-4 border-l-2 border-[#f35815] bg-[#f35815]/10 text-[#fca5a5] font-sans text-[14.5px] rounded-r border-t border-r border-b border-[#f35815]/20">
                  <div className="flex items-center space-x-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#f35815] mb-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>IMPORTANT</span>
                  </div>
                  <div className="text-[#f4f4f5]">{children}</div>
                </div>
              );
            }

            return (
              <blockquote className="my-6 pl-4 border-l-2 border-[#f35815] italic text-[#a3a3a3] text-[15.5px] bg-[#121212]/50 py-2.5 pr-4 font-normal">
                {children}
              </blockquote>
            );
          },
          // Horizontal Rule
          hr: () => <hr className="my-8 border-t border-[#262626]" />,
          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f35815] hover:underline underline-offset-4 font-mono text-[14px]"
            >
              {children}
            </a>
          ),
          // Lists
          ul: ({ children }) => (
            <ul className="my-4 pl-6 space-y-2 list-disc marker:text-[#f35815] text-[#d4d4d4]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-4 pl-6 space-y-2 list-decimal marker:text-[#888888] font-mono text-[14px] text-[#d4d4d4]">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="text-[15px] leading-relaxed">{children}</li>,
          // Tables
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 border border-[#262626]">
              <table className="w-full text-left font-mono text-[13px] border-collapse min-w-[500px]">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[#121212] text-[#888888] border-b border-[#262626] text-[11px] uppercase tracking-wider">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-[#262626] bg-[#080808]">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-[#141414] transition-colors">{children}</tr>
          ),
          th: ({ children }) => <th className="py-3 px-4 font-normal text-[#fafafa]">{children}</th>,
          td: ({ children }) => <td className="py-3 px-4 text-[#d4d4d4]">{children}</td>,
          // Code Block vs Inline Code
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const codeText = String(children).replace(/\n$/, '');

            if (match || codeText.includes('\n')) {
              return (
                <CodeBlockWrapper language={language || 'CODE'} codeText={codeText} />
              );
            }

            return (
              <code
                className="font-mono text-[13px] bg-[#181818] text-[#f35815] px-1.5 py-0.5 border border-[#262626] rounded-sm"
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => <>{children}</>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

// Code Block Component with PlanetScale Header & Copy Button
const CodeBlockWrapper: React.FC<{ language: string; codeText: string }> = ({ language, codeText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 border border-[#262626] bg-[#121212] overflow-hidden">
      {/* Code Box Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0d0d0d] border-b border-[#262626] font-mono text-[11px]">
        <div className="flex items-center space-x-2 text-[#888888]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f35815]"></span>
          <span className="uppercase tracking-wider">{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 text-[#888888] hover:text-[#fafafa] transition-colors focus:outline-none cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-[#10b981]" />
              <span className="text-[#10b981]">COPIED</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>COPY</span>
            </>
          )}
        </button>
      </div>

      {/* Code Text */}
      <div className="p-4 font-mono text-[13px] leading-relaxed text-[#fafafa] overflow-x-auto bg-[#121212]">
        <pre className="whitespace-pre">{codeText}</pre>
      </div>
    </div>
  );
};
