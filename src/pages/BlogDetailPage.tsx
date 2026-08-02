import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPostBySlug, getAllPostsFromFolder } from '../utils/postsLoader';
import { PlanetScaleMarkdownRenderer } from '../components/PlanetScaleMarkdownRenderer';
import { TopBar } from '../components/TopBar';
import { FooterSection } from '../components/FooterSection';
import { SectionDivider } from '../components/SectionDivider';
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  Tag,
  Share2,
  Check,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface BlogDetailPageProps {
  onOpenResume?: () => void;
  onOpenCommandPalette?: () => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({
  onOpenResume = () => {},
  onOpenCommandPalette = () => {},
}) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const post = useMemo(() => (slug ? getPostBySlug(slug) : undefined), [slug]);
  const allPosts = useMemo(() => getAllPostsFromFolder(), []);

  // Compute Next and Previous articles
  const { prevPost, nextPost } = useMemo(() => {
    if (!post) return { prevPost: null, nextPost: null };
    const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
    const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
    return { prevPost, nextPost };
  }, [post, allPosts]);

  // Track reading scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-ps-grid bg-[#080808] text-[#fafafa] font-sans antialiased py-10 px-6 flex flex-col items-center justify-center">
        <main className="max-w-[700px] w-full ps-main-container bg-[#080808] p-12 text-center space-y-6">
          <h1 className="text-2xl font-mono text-[#f35815]">404 // ARTICLE NOT FOUND</h1>
          <p className="text-[#888888] font-mono text-[13px]">
            The post with slug "{slug}" could not be found in `@content/posts`.
          </p>
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#121212] border border-[#262626] text-[#fafafa] font-mono text-[13px] hover:border-[#f35815] hover:text-[#f35815] transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO ALL ARTICLES</span>
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ps-grid bg-[#080808] text-[#fafafa] font-sans antialiased py-6 sm:py-10 px-3 sm:px-6 relative">
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-[#f35815] z-50 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <main className="max-w-[900px] mx-auto ps-main-container bg-[#080808] shadow-none rounded-none overflow-hidden">
        {/* TopBar */}
        <TopBar
          onOpenCommandPalette={onOpenCommandPalette}
          onOpenResume={onOpenResume}
        />

        {/* Article Navigation Bar */}
        <div className="px-6 py-4 bg-[#0c0c0c] flex items-center justify-between font-mono text-[12px] text-[#737373]">
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-[#888888] hover:text-[#f35815] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ALL ARTICLES</span>
          </Link>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center space-x-1.5 text-[#888888] hover:text-[#fafafa] transition-colors focus:outline-none cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#10b981]" />
                  <span className="text-[#10b981]">LINK COPIED</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>SHARE</span>
                </>
              )}
            </button>

            <span className="text-[#333333]">|</span>
            <span className="text-[#a3a3a3] uppercase">{post.tag}</span>
          </div>
        </div>

        <SectionDivider variant="primary" />

        {/* Article Metadata Header */}
        <header className="p-6 md:p-12 space-y-6 bg-[#080808]">
          <div className="flex items-center space-x-3 font-mono text-[12px]">
            <span className="px-2.5 py-1 uppercase bg-[#f35815]/10 border border-[#f35815]/40 text-[#f35815] flex items-center gap-1.5">
              <Tag className="w-3 h-3" />
              {post.tag}
            </span>

            {post.isMdx && (
              <span className="px-2 py-1 uppercase border border-[#262626] text-[#a3a3a3] bg-[#121212] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#f35815]" /> MDX FILE
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-medium tracking-tight text-[#fafafa] leading-[1.25]">
            {post.title}
          </h1>

          {/* Published metadata */}
          <div className="flex flex-wrap items-center gap-4 text-[13px] font-mono text-[#888888] pt-2 border-t border-[#1a1a1a]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#737373]" />
              {post.date}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5 text-[#d4d4d4]">
              <Clock className="w-3.5 h-3.5 text-[#737373]" />
              {post.readTime} read
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#737373]" />
              Written by {post.author}
            </span>
          </div>

          {/* Excerpt Lead Callout */}
          {post.summary && (
            <div className="p-4 border-l-2 border-[#f35815] bg-[#121212] text-[#d4d4d4] text-[15px] italic leading-relaxed">
              {post.summary}
            </div>
          )}
        </header>

        <SectionDivider variant="subtle" />

        {/* Main Article Content Container */}
        <article className="p-6 md:p-12 bg-[#080808]">
          <PlanetScaleMarkdownRenderer content={post.contentMarkdown} />
        </article>

        <SectionDivider variant="primary" />

        {/* Previous / Next Article Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#262626] bg-[#0c0c0c]">
          {prevPost ? (
            <Link
              to={`/blog/${prevPost.slug}`}
              className="p-6 hover:bg-[#121212] transition-colors group space-y-1 block"
            >
              <span className="font-mono text-[11px] text-[#737373] uppercase tracking-wider flex items-center gap-1 group-hover:text-[#f35815]">
                <ChevronLeft className="w-3.5 h-3.5" /> PREVIOUS ARTICLE
              </span>
              <p className="text-[15px] font-medium text-[#fafafa] group-hover:text-[#f35815] transition-colors line-clamp-1">
                {prevPost.title}
              </p>
            </Link>
          ) : (
            <div className="p-6 text-[#444444] font-mono text-[11px] uppercase">
              EARLIEST ARTICLE REACHED
            </div>
          )}

          {nextPost ? (
            <Link
              to={`/blog/${nextPost.slug}`}
              className="p-6 hover:bg-[#121212] transition-colors group space-y-1 text-right block"
            >
              <span className="font-mono text-[11px] text-[#737373] uppercase tracking-wider flex items-center justify-end gap-1 group-hover:text-[#f35815]">
                NEXT ARTICLE <ChevronRight className="w-3.5 h-3.5" />
              </span>
              <p className="text-[15px] font-medium text-[#fafafa] group-hover:text-[#f35815] transition-colors line-clamp-1">
                {nextPost.title}
              </p>
            </Link>
          ) : (
            <div className="p-6 text-[#444444] font-mono text-[11px] uppercase text-right">
              LATEST ARTICLE REACHED
            </div>
          )}
        </div>

        <SectionDivider variant="subtle" />

        {/* Back to Blog List Footer Bar */}
        <div className="p-6 bg-[#080808] flex items-center justify-between font-mono text-[12px]">
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-[#fafafa] hover:text-[#f35815] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#f35815]" />
            <span>BACK TO ALL WRITING</span>
          </Link>
          <span className="text-[#737373]">@content/posts/{slug}.{post.isMdx ? 'mdx' : 'md'}</span>
        </div>

        {/* Global Footer */}
        <FooterSection onOpenResume={onOpenResume} />
      </main>
    </div>
  );
};
