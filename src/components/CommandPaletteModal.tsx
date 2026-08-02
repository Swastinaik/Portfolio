import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS_DATA, PERSONAL_INFO } from '../data/portfolioData';
import { getAllPostsFromFolder } from '../utils/postsLoader';
import { BookOpen } from 'lucide-react';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (id: string) => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const allPosts = useMemo(() => getAllPostsFromFolder(), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k') || (e.metaKey && e.key === 'k')) && !isOpen) {
        e.preventDefault();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProjects = PROJECTS_DATA.filter(
    p => p.name.toLowerCase().includes(query.toLowerCase()) || (p.descriptionPoints && p.descriptionPoints.some(pt => pt.toLowerCase().includes(query.toLowerCase())))
  );

  const filteredPosts = allPosts.filter(
    b => b.title.toLowerCase().includes(query.toLowerCase()) || b.tag.toLowerCase().includes(query.toLowerCase()) || b.summary.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#080808] border border-[#262626] w-full max-w-[600px] overflow-hidden font-mono text-[13px] shadow-none">
        {/* Command Search Bar */}
        <div className="flex items-center px-4 py-3 border-b border-[#262626] bg-[#121212]">
          <span className="text-[#f35815] mr-2 select-none">&gt;</span>
          <input
            type="text"
            autoFocus
            placeholder="Type a command or search posts/projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent outline-none text-[#fafafa] placeholder:text-[#888888] font-mono text-[13px]"
          />
          <button
            onClick={onClose}
            className="text-[11px] text-[#888888] hover:text-[#fafafa] ml-2 focus:outline-none cursor-pointer"
          >
            [ESC]
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[350px] overflow-y-auto divide-y divide-[#262626]">
          {/* Quick Actions */}
          <div className="p-2 bg-[#080808]">
            <div className="text-[10px] text-[#888888] uppercase px-2 py-1">COMMANDS</div>
            <button
              onClick={() => {
                navigate('/blog');
                onClose();
              }}
              className="w-full text-left px-2 py-1.5 hover:bg-[#fafafa] hover:text-[#080808] transition-colors flex items-center justify-between text-[#fafafa] cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#f35815]" />
                <span>view all blogs</span>
              </span>
              <span className="text-[11px] text-[#888888]">FULL PAGE WRITING</span>
            </button>

            <button
              onClick={() => {
                navigator.clipboard.writeText(PERSONAL_INFO.email);
                onClose();
              }}
              className="w-full text-left px-2 py-1.5 hover:bg-[#fafafa] hover:text-[#080808] transition-colors flex items-center justify-between text-[#fafafa] cursor-pointer"
            >
              <span>contact --email</span>
              <span className="text-[11px] text-[#888888]">COPY EMAIL</span>
            </button>

            <button
              onClick={() => {
                window.open(PERSONAL_INFO.github, '_blank');
                onClose();
              }}
              className="w-full text-left px-2 py-1.5 hover:bg-[#fafafa] hover:text-[#080808] transition-colors flex items-center justify-between text-[#fafafa] cursor-pointer"
            >
              <span>github --open</span>
              <span className="text-[11px] text-[#888888]">EXTERNAL LINK</span>
            </button>
          </div>

          {/* Blog Posts */}
          {filteredPosts.length > 0 && (
            <div className="p-2 bg-[#080808]">
              <div className="text-[10px] text-[#888888] uppercase px-2 py-1">WRITING / ARTICLES ({filteredPosts.length})</div>
              {filteredPosts.map((b) => (
                <button
                  key={b.slug}
                  onClick={() => {
                    navigate(`/blog/${b.slug}`);
                    onClose();
                  }}
                  className="w-full text-left px-2 py-1.5 hover:bg-[#fafafa] hover:text-[#080808] transition-colors flex items-center justify-between text-[#fafafa] cursor-pointer"
                >
                  <span className="truncate max-w-[380px] font-medium">{b.title}</span>
                  <span className="text-[11px] text-[#888888]">{b.date}</span>
                </button>
              ))}
            </div>
          )}

          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div className="p-2 bg-[#0d0d0d]">
              <div className="text-[10px] text-[#888888] uppercase px-2 py-1">PROJECTS ({filteredProjects.length})</div>
              {filteredProjects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onSelectProject(p.id);
                    onClose();
                  }}
                  className="w-full text-left px-2 py-1.5 hover:bg-[#fafafa] hover:text-[#080808] transition-colors flex items-center justify-between text-[#fafafa] cursor-pointer"
                >
                  <span className="font-medium">{p.name}</span>
                  <span className="text-[11px] text-[#888888]">{p.stack}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Command Palette Footer */}
        <div className="px-4 py-2 bg-[#121212] border-t border-[#262626] text-[10px] text-[#888888] flex justify-between">
          <span>NAVIGATION KEYBOARD CONTROLS</span>
          <span>PRESS ESC TO CLOSE</span>
        </div>
      </div>
    </div>
  );
};
