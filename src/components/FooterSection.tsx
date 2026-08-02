import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { SectionDivider } from './SectionDivider';
import { Mail, GitBranch, FileText, Send, Check, Terminal } from 'lucide-react';

interface FooterSectionProps {
  onOpenResume: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenResume }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleContactEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleOpenGithub = () => {
    window.open(PERSONAL_INFO.github, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <SectionDivider variant="primary" />
      <footer className="p-6 md:p-12 fade-in delay-4 font-mono text-[13px] bg-[#080808] space-y-8">
        {/* Section Header */}
        <div className="flex items-center gap-2 text-[12px] font-mono text-[#737373] tracking-widest uppercase">
          <Send className="w-3.5 h-3.5 text-[#f35815]" />
          <span>04. CONTACT</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          {/* Contact Links */}
          <div className="space-y-3 text-[#fafafa]">
            <div className="flex items-center space-x-3">
              <span className="text-[#737373] flex items-center gap-1.5 w-24">
                <Mail className="w-3.5 h-3.5 text-[#525252]" />
                <span>Email —</span>
              </span>
              <button
                onClick={handleContactEmail}
                className="text-[#f35815] hover:underline focus:outline-none flex items-center space-x-2 cursor-pointer"
              >
                <span>{PERSONAL_INFO.email}</span>
                {copiedEmail && (
                  <span className="text-[11px] text-[#10b981] flex items-center gap-1">
                    <Check className="w-3 h-3" /> [COPIED]
                  </span>
                )}
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-[#737373] flex items-center gap-1.5 w-24">
                <GitBranch className="w-3.5 h-3.5 text-[#525252]" />
                <span>GitHub —</span>
              </span>
              <button
                onClick={handleOpenGithub}
                className="text-[#fafafa] hover:text-[#f35815] hover:underline focus:outline-none cursor-pointer"
              >
                github.com/swastik ↗
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-[#737373] flex items-center gap-1.5 w-24">
                <FileText className="w-3.5 h-3.5 text-[#525252]" />
                <span>Resume —</span>
              </span>
              <button
                onClick={onOpenResume}
                className="text-[#fafafa] hover:text-[#f35815] hover:underline focus:outline-none cursor-pointer"
              >
                resume.pdf ↗
              </button>
            </div>
          </div>

          {/* Minimal Copyright */}
          <div className="text-[12px] text-[#737373] md:text-right flex items-center gap-1.5 font-mono">
            <Terminal className="w-3.5 h-3.5 text-[#f35815]" />
            <p>© 2026 Swastik. Built with React & Tailwind CSS.</p>
          </div>
        </div>
      </footer>
    </>
  );
};
