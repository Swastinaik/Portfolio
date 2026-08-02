import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { SectionDivider } from './SectionDivider';
import { UserCheck, Monitor, Server, Cloud, Target, Mail } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="main" className="p-6 md:p-12 fade-in delay-1 space-y-8 bg-[#080808]">
      {/* Section Header */}
      <div className="flex items-center gap-2 text-[12px] font-mono text-[#737373] tracking-widest uppercase">
        <UserCheck className="w-3.5 h-3.5 text-[#f35815]" />
        <span>01. ABOUT</span>
      </div>

      {/* Name & Headline */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-medium text-[#fafafa] tracking-tight">
          {PERSONAL_INFO.name}
        </h1>
        <p className="text-lg sm:text-xl font-normal text-[#a3a3a3] leading-snug">
          {PERSONAL_INFO.title}
        </p>
      </div>

      {/* Bio Paragraph */}
      <p className="text-[15.5px] leading-[1.8] font-normal text-[#d4d4d4] max-w-2xl">
        {PERSONAL_INFO.bio}
      </p>

      {/* Sub-level Section Divider */}
      <SectionDivider variant="subtle" />

      {/* Tech Stacks Breakdown */}
      <div className="pt-2 font-mono text-[13px] space-y-3 max-w-2xl">
        {/* Frontend Stack */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 border-b border-[#171717]">
          <span className="text-[#737373] uppercase text-[11px] font-medium tracking-wider flex items-center gap-1.5">
            <Monitor className="w-3 h-3 text-[#525252]" />
            <span>FRONTEND</span>
          </span>
          <span className="text-[#fafafa]">{PERSONAL_INFO.frontendStack}</span>
        </div>

        {/* Backend Stack */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 border-b border-[#171717]">
          <span className="text-[#737373] uppercase text-[11px] font-medium tracking-wider flex items-center gap-1.5">
            <Server className="w-3 h-3 text-[#525252]" />
            <span>BACKEND</span>
          </span>
          <span className="text-[#fafafa]">{PERSONAL_INFO.backendStack}</span>
        </div>

        {/* Infra Stack */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 border-b border-[#171717]">
          <span className="text-[#737373] uppercase text-[11px] font-medium tracking-wider flex items-center gap-1.5">
            <Cloud className="w-3 h-3 text-[#525252]" />
            <span>INFRA</span>
          </span>
          <span className="text-[#fafafa]">{PERSONAL_INFO.infraStack}</span>
        </div>

        {/* Focus */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5 border-b border-[#171717]">
          <span className="text-[#737373] uppercase text-[11px] font-medium tracking-wider flex items-center gap-1.5">
            <Target className="w-3 h-3 text-[#525252]" />
            <span>FOCUS</span>
          </span>
          <span className="text-[#fafafa]">{PERSONAL_INFO.focus}</span>
        </div>

        {/* Email */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1.5">
          <span className="text-[#737373] uppercase text-[11px] font-medium tracking-wider flex items-center gap-1.5">
            <Mail className="w-3 h-3 text-[#f35815]" />
            <span>EMAIL</span>
          </span>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="text-[#f35815] hover:underline underline-offset-4 flex items-center gap-1"
          >
            <span>{PERSONAL_INFO.email}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
