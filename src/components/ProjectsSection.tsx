import React from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { SectionDivider } from './SectionDivider';
import { Zap, FolderCode } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  return (
    <>
      <SectionDivider variant="primary" />
      <section id="projects" className="p-6 md:p-12 fade-in delay-2 space-y-8 bg-[#080808]">
        {/* Section Header */}
        <div className="flex items-center justify-between text-[12px] font-mono text-[#737373] tracking-widest uppercase">
          <span className="flex items-center gap-2">
            <FolderCode className="w-3.5 h-3.5 text-[#f35815]" />
            <span>02. SELECTED PROJECTS</span>
          </span>
          <span>({PROJECTS_DATA.length})</span>
        </div>

        {/* Projects List */}
        <div className="space-y-10">
          {PROJECTS_DATA.map((project) => {
            const points: string[] = [];
            if (project.descriptionPoints && project.descriptionPoints.length > 0) {
              points.push(...project.descriptionPoints);
            } else {
              if (project.descriptionPoint1) points.push(project.descriptionPoint1);
              if (project.descriptionPoint2) points.push(project.descriptionPoint2);
            }

            return (
              <article
                key={project.id}
                className="group space-y-3 pb-8 border-b border-[#1f1f1f] last:border-b-0 last:pb-0"
              >
                {/* Title & External Links Row */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <h3 className="text-[20px] font-medium text-[#fafafa] group-hover:text-[#f35815] transition-colors tracking-tight">
                    {project.name}
                  </h3>

                  {/* Clean Minimal Live & GitHub Links */}
                  <div className="font-mono text-[13px] flex items-center space-x-4 shrink-0">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#f35815] hover:underline"
                      >
                        live ↗
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#888888] hover:text-[#fafafa] hover:underline"
                      >
                        github ↗
                      </a>
                    )}
                  </div>
                </div>

                {/* Tech Stack Row */}
                <div className="font-mono text-[12.5px] text-[#737373]">
                  <span>Stack: </span>
                  <span className="text-[#a3a3a3]">{project.stack}</span>
                </div>

                {/* Description & Impact Bullet Points List */}
                <ul className="space-y-2 font-sans text-[15px] pt-1">
                  {points.map((pt, index) => (
                    <li key={index} className="flex items-start space-x-2.5 text-[#d4d4d4] leading-relaxed">
                      <span className="text-[#525252] font-mono text-[13px] select-none mt-0.5">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}

                  {project.impactPoint2 && (
                    <li className="flex items-start space-x-2.5 text-[#a3a3a3] font-mono text-[13.5px] leading-relaxed">
                      <Zap className="w-3.5 h-3.5 text-[#f35815] shrink-0 mt-1" />
                      <span><strong className="text-[#fafafa] font-semibold">Impact:</strong> {project.impactPoint2}</span>
                    </li>
                  )}
                </ul>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
};
