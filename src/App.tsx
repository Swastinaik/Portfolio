import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { TopBar } from './components/TopBar';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { BlogSection } from './components/BlogSection';
import { FooterSection } from './components/FooterSection';
import { ArticleModal } from './components/ArticleModal';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { BlogListPage } from './pages/BlogListPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { PROJECTS_DATA, PERSONAL_INFO } from './data/portfolioData';
import type { ProjectItem } from './types';

// Main Home Page Component
function HomePage({
  onOpenResume,
  isCommandPaletteOpen,
  setIsCommandPaletteOpen,
  activeArticle,
  setActiveArticle,
}: {
  onOpenResume: () => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  activeArticle: { title: string; content: string } | null;
  setActiveArticle: (art: { title: string; content: string } | null) => void;
}) {
  const handleSelectProject = (project: ProjectItem) => {
    setActiveArticle({
      title: project.name,
      content: project.detailsMarkdown || `# ${project.name}\n\n${project.descriptionPoints?.join('\n\n') || ''}`,
    });
  };

  const handleSelectProjectById = (id: string) => {
    const proj = PROJECTS_DATA.find((p) => p.id === id);
    if (proj) handleSelectProject(proj);
  };

  return (
    <div className="min-h-screen bg-ps-grid bg-[#080808] text-[#fafafa] font-sans antialiased py-6 sm:py-10 px-3 sm:px-6">
      {/* Centered Document Layout: Max Width 900px, 1px Outer Border */}
      <main className="max-w-[900px] mx-auto ps-main-container bg-[#080808] shadow-none rounded-none overflow-hidden">
        {/* Top Bar: LIVE Status & Resume */}
        <TopBar
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenResume={onOpenResume}
        />

        {/* SECTION 1: MAIN / ABOUT — id="main" */}
        <AboutSection />

        {/* SECTION 2: PROJECTS — id="projects" */}
        <ProjectsSection />

        {/* SECTION 3: BLOG — id="blog" */}
        <BlogSection />

        {/* END / FOOTER */}
        <FooterSection onOpenResume={onOpenResume} />
      </main>

      {/* Floating Keyboard Shortcut Hint for Desktop */}
      <div className="max-w-[900px] mx-auto mt-4 px-2 flex items-center justify-between text-[11px] font-mono text-[#888888]">
        <div className="flex items-center space-x-2">
          <span>PRESS</span>
          <kbd className="px-1.5 py-0.5 border border-[#262626] bg-[#121212] text-[#fafafa]">
            /
          </kbd>
          <span>OR</span>
          <kbd className="px-1.5 py-0.5 border border-[#262626] bg-[#121212] text-[#fafafa]">
            CTRL + K
          </kbd>
          <span>FOR COMMAND PALETTE</span>
        </div>
        <div>
          <span>PLANETSCALE DARK THEME SPEC</span>
        </div>
      </div>

      {/* Markdown Reader Modal for Projects & Resume */}
      <ArticleModal
        isOpen={!!activeArticle}
        title={activeArticle?.title || ''}
        markdownContent={activeArticle?.content || ''}
        onClose={() => setActiveArticle(null)}
      />

      {/* Command Palette Modal */}
      <CommandPaletteModal
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectProject={handleSelectProjectById}
      />
    </div>
  );
}

export function App() {
  const [activeArticle, setActiveArticle] = useState<{
    title: string;
    content: string;
  } | null>(null);

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Keybindings listener (Press '/' or 'Ctrl+K' / 'Cmd+K' to toggle command palette)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === '/' || (e.ctrlKey && e.key === 'k') || (e.metaKey && e.key === 'k')) &&
        !activeArticle &&
        !isCommandPaletteOpen
      ) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setIsCommandPaletteOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeArticle, isCommandPaletteOpen]);

  const handleOpenResume = () => {
    setActiveArticle({
      title: 'RESUME.pdf — Swastik',
      content: `# RESUME — ${PERSONAL_INFO.name}

> ${PERSONAL_INFO.title}
> Email: ${PERSONAL_INFO.email}

---

## EXPERTISE
- **Languages:** TypeScript, Go, SQL (Postgres), Rust (WASM), Python
- **Frameworks & Edge:** Next.js, Hono, React, Cloudflare Workers, Node.js
- **Database & Storage:** PostgreSQL, pgvector, Redis, TimescaleDB, CRDTs
- **Architecture:** Distributed systems, query optimization, high-frequency telemetry, edge micro-services

---

## RECENT WORK EXPERIENCE
### Senior Distributed Systems Engineer (2022 — Present)
- Engineered real-time ingestion pipelines handling 50,000+ Postgres writes/sec with sub-15ms p99 latency.
- Built vector search layer with pgvector, reducing vector index query latencies by 64%.
- Designed edge cache invalidation protocol reducing origin DB load by 80%.

---

## EDUCATION
- B.S. in Computer Science & Engineering

---

*Resume generated dynamically. Contact ${PERSONAL_INFO.email} for complete credentials.*
`,
    });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            onOpenResume={handleOpenResume}
            isCommandPaletteOpen={isCommandPaletteOpen}
            setIsCommandPaletteOpen={setIsCommandPaletteOpen}
            activeArticle={activeArticle}
            setActiveArticle={setActiveArticle}
          />
        }
      />
      <Route
        path="/blog"
        element={
          <BlogListPage
            onOpenResume={handleOpenResume}
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          />
        }
      />
      <Route
        path="/blog/:slug"
        element={
          <BlogDetailPage
            onOpenResume={handleOpenResume}
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          />
        }
      />
    </Routes>
  );
}

export default App;
