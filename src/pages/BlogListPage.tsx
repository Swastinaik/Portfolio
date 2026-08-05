import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getAllPostsFromFolder, type PostMetaData } from '../utils/postsLoader';
import { TopBar } from '../components/TopBar';
import { FooterSection } from '../components/FooterSection';
import { SectionDivider } from '../components/SectionDivider';
import { Search, Tag, Clock, ArrowRight, ArrowLeft, Sparkles, BookOpen } from 'lucide-react';

interface BlogListPageProps {
  onOpenResume?: () => void;
  onOpenCommandPalette?: () => void;
}

export const BlogListPage: React.FC<BlogListPageProps> = ({
  onOpenResume = () => { },
  onOpenCommandPalette = () => { },
}) => {
  const posts = useMemo(() => getAllPostsFromFolder(), []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('ALL');

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => {
      if (p.tag) set.add(p.tag);
    });
    return ['ALL', ...Array.from(set)];
  }, [posts]);

  // Filter posts based on search query & tag filter
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesTag = selectedTag === 'ALL' || post.tag.toLowerCase() === selectedTag.toLowerCase();
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.summary.toLowerCase().includes(query) ||
        post.tag.toLowerCase().includes(query) ||
        post.date.includes(query);
      return matchesTag && matchesSearch;
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <div className="min-h-screen bg-ps-grid bg-[#080808] text-[#fafafa] font-sans antialiased py-6 sm:py-10 px-3 sm:px-6">
      <main className="max-w-[900px] mx-auto ps-main-container bg-[#080808] shadow-none rounded-none overflow-hidden">
        {/* TopBar */}
        <TopBar
          onOpenCommandPalette={onOpenCommandPalette}
          onOpenResume={onOpenResume}
        />

        {/* Header Breadcrumb & Status */}
        <div className="p-6 md:p-8 bg-[#0c0c0c] space-y-4">
          <div className="flex items-center justify-between font-mono text-[12px] text-[#737373]">
            <Link
              to="/"
              className="inline-flex items-center space-x-1.5 hover:text-[#f35815] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>HOME</span>
              <span className="text-[#333333]">/</span>
              <span className="text-[#fafafa]">WRITING</span>
            </Link>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
              <span className="uppercase tracking-widest text-[11px]">
                CONTENT FOLDER: @content/posts ({posts.length} ARTICLES)
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#fafafa] flex items-center gap-2">
                <span>All Articles & Technical Notes</span>
                <BookOpen className="w-5 h-5 text-[#f35815] inline" />
              </h1>
              <p className="text-[14px] text-[#888888] mt-1 font-mono">
                System architecture, database internals, edge runtimes, and engineering notes.
              </p>
            </div>
          </div>

          {/* Search Bar & Tag Filters */}
          <div className="space-y-3 pt-4 border-t border-[#1f1f1f]">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]" />
              <input
                type="text"
                placeholder="Search articles by title, keyword, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#121212] border border-[#262626] pl-9 pr-4 py-2 text-[13px] font-mono text-[#fafafa] placeholder-[#525252] focus:outline-none focus:border-[#f35815] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-mono text-[#737373] hover:text-[#fafafa]"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Tag Filter Pills */}
            <div className="flex items-center flex-wrap gap-1.5 pt-1">
              <span className="font-mono text-[11px] text-[#737373] mr-1 flex items-center gap-1">
                <Tag className="w-3 h-3" /> TAGS:
              </span>
              {allTags.map((tag) => {
                const isActive = selectedTag === tag;
                return (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`font-mono text-[11px] px-2.5 py-1 uppercase transition-colors border ${isActive
                        ? 'bg-[#f35815] text-[#ffffff] border-[#f35815]'
                        : 'bg-[#121212] text-[#888888] border-[#262626] hover:border-[#525252] hover:text-[#fafafa]'
                      }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <SectionDivider variant="primary" />

        {/* Blog Post List */}
        <section className="divide-y divide-[#1f1f1f]">
          {filteredPosts.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <p className="font-mono text-[13px] text-[#737373]">
                No articles match your current search query "{searchQuery}".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTag('ALL');
                }}
                className="font-mono text-[12px] text-[#f35815] hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))
          )}
        </section>

        {/* Footer */}
        <FooterSection onOpenResume={onOpenResume} />
      </main>
    </div>
  );
};

const ArticleCard: React.FC<{ post: PostMetaData }> = ({ post }) => {
  return (
    <article className="group p-6 md:p-8 hover:bg-[#0c0c0c] transition-colors">
      <Link to={`/blog/${post.slug}`} className="block space-y-3">
        {/* Meta Bar */}
        <div className="flex items-center justify-between font-mono text-[12px] text-[#737373]">
          <div className="flex items-center space-x-3">
            <span>{post.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1 text-[#a3a3a3]">
              <Clock className="w-3 h-3" /> {post.readTime}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {post.isMdx && (
              <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 border border-[#f35815]/40 text-[#f35815] bg-[#f35815]/10 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> MDX
              </span>
            )}
            <span className="font-mono text-[11px] uppercase px-2 py-0.5 border border-[#262626] text-[#888888] bg-[#121212] group-hover:border-[#f35815]/50 group-hover:text-[#fafafa] transition-colors">
              {post.tag}
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-medium text-[#fafafa] group-hover:text-[#f35815] transition-colors leading-snug">
          {post.title}
        </h2>

        {/* Summary Excerpt */}
        <p className="text-[14.5px] text-[#a3a3a3] leading-relaxed line-clamp-2">
          {post.summary}
        </p>

        {/* Read More Footer */}
        <div className="pt-2 flex items-center justify-between font-mono text-[12.5px] text-[#888888] group-hover:text-[#fafafa]">
          <span>AUTHOR: {post.author}</span>
          <span className="inline-flex items-center space-x-1.5 text-[#f35815] group-hover:translate-x-1 transition-transform">
            <span>READ FULL ARTICLE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>
    </article>
  );
};
