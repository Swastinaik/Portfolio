import React, { useEffect } from 'react';
import { PlanetScaleMarkdownRenderer } from './PlanetScaleMarkdownRenderer';

interface ArticleModalProps {
  isOpen: boolean;
  title: string;
  markdownContent: string;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  isOpen,
  title,
  markdownContent,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#080808] border border-[#262626] w-full max-w-[900px] max-h-[90vh] flex flex-col shadow-none rounded-none overflow-hidden">
        {/* Modal Topbar */}
        <div className="flex items-center justify-between border-b border-[#262626] px-6 py-3.5 bg-[#121212] font-mono text-[12px] select-none">
          <button
            onClick={onClose}
            className="text-[#f35815] hover:underline flex items-center space-x-1.5 focus:outline-none"
          >
            <span>←</span>
            <span>RETURN TO PORTFOLIO</span>
          </button>

          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline text-[#888888]">
              DOCUMENT / {title.toUpperCase()}
            </span>
            <button
              onClick={onClose}
              className="text-[#888888] hover:text-[#fafafa] transition-colors focus:outline-none"
            >
              [ESC / CLOSE]
            </button>
          </div>
        </div>

        {/* Scrollable Content Container */}
        <div className="p-6 md:p-12 overflow-y-auto bg-[#080808]">
          <PlanetScaleMarkdownRenderer content={markdownContent} />
        </div>

        {/* Modal Footer */}
        <div className="border-t border-[#262626] px-6 py-3 bg-[#0d0d0d] font-mono text-[11px] text-[#888888] flex justify-between select-none">
          <span>READING MODE — PLANETSCALE DOCS SPEC</span>
          <button onClick={onClose} className="hover:text-[#fafafa] underline">
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
