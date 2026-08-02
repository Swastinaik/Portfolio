import React, { useState } from 'react';
import { SectionDivider } from './SectionDivider';
import { FileText, Mail, Command, Check } from 'lucide-react';

interface TopBarProps {
  onOpenCommandPalette: () => void;
  onOpenResume: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onOpenCommandPalette, onOpenResume }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('swastinaik273@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <header className="px-6 py-4 bg-[#080808] flex items-center justify-between font-mono text-[12px] select-none">
        {/* Status indicator */}
        <div className="flex items-center space-x-2.5">
          <span className="w-2 h-2 rounded-full bg-[#f35815] animate-pulse shrink-0"></span>
          <span className="text-[#fafafa] tracking-wide font-medium">AVAILABLE FOR WORK</span>
        </div>

        {/* Top Links: Resume.pdf, Copy Email & Command Palette */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onOpenResume}
            className="text-[#f35815] hover:underline transition-colors focus:outline-none font-medium cursor-pointer inline-flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-[#f35815]" />
            <span>RESUME.pdf</span>
          </button>

          <button
            onClick={handleCopyEmail}
            className="text-[#888888] hover:text-[#fafafa] transition-colors focus:outline-none hidden sm:inline-flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#10b981]" />
                <span className="text-[#10b981]">COPIED</span>
              </>
            ) : (
              <>
                <Mail className="w-3.5 h-3.5 text-[#888888]" />
                <span>EMAIL</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenCommandPalette}
            className="inline-flex items-center space-x-1.5 px-2 py-1 border border-[#262626] bg-[#121212] text-[#888888] hover:text-[#fafafa] hover:border-[#525252] transition-colors cursor-pointer"
            title="Open Command Palette (Press /)"
          >
            <Command className="w-3 h-3 text-[#f35815]" />
            <span className="text-[11px]">CMD</span>
          </button>
        </div>
      </header>
      <SectionDivider variant="primary" />
    </>
  );
};
