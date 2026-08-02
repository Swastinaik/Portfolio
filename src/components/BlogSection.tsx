import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllPostsFromFolder } from '../utils/postsLoader';
import { SectionDivider } from './SectionDivider';
import { ArrowRight, BookOpen, FileText, Clock, Tag } from 'lucide-react';

interface BlogSectionProps {
  onSelectPost?: (post: { title: string; content: string }) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = () => {
  const navigate = useNavigate();
  const posts = useMemo(() => getAllPostsFromFolder(), []);

  // Display top 5 posts on home page
  const displayPosts = useMemo(() => posts.slice(0, 5), [posts]);

  return (
    <>
      <SectionDivider variant="primary" />
      <section id="blog" className="p-6 md:p-12 fade-in delay-3 space-y-6 bg-[#080808]">
        {/* Section Header */}
        <div className="flex items-center justify-between text-[12px] font-mono text-[#737373] tracking-widest uppercase">
          <span className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-[#f35815]" />
            <span>03. WRITING</span>
            <span className="text-[#333333]">/</span>
            <span className="text-[#a3a3a3]">@content/posts</span>
          </span>
          <span className="text-[#f35815] font-mono flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            {posts.length} ARTICLES
          </span>
        </div>

        {/* Writing Log List */}
        <div className="divide-y divide-[#1f1f1f]">
          {displayPosts.map((post) => (
            <article
              key={post.slug}
              onClick={() => navigate(`/blog/${post.slug}`)}
              className="group py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 cursor-pointer transition-colors"
            >
              {/* Date + Title */}
              <div className="flex flex-col sm:flex-row sm:items-baseline space-y-1 sm:space-y-0 sm:space-x-4">
                <span className="font-mono text-[12.5px] text-[#737373] shrink-0">
                  {post.date}
                </span>

                <h3 className="text-[17px] font-medium text-[#fafafa] group-hover:text-[#f35815] transition-colors leading-snug">
                  {post.title}
                </h3>
              </div>

              {/* Read Time & Tag */}
              <span className="font-mono text-[12.5px] text-[#737373] shrink-0 group-hover:text-[#fafafa] transition-colors flex items-center gap-2">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#525252]" /> {post.readTime}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Tag className="w-3 h-3 text-[#525252]" /> {post.tag}</span>
              </span>
            </article>
          ))}
        </div>

        <SectionDivider variant="subtle" />

        {/* Prominent Action Button to Navigate to All Blogs Full Page */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[12px] text-[#737373]">
            All posts are written and within the copyright <code className="text-[#a3a3a3]">© 2026 Swasti</code>.
          </p>

          <Link
            to="/blog"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-[#121212] border border-[#262626] text-[#fafafa] font-mono text-[13px] hover:border-[#f35815] hover:text-[#f35815] hover:bg-[#181818] transition-all group"
          >
            <BookOpen className="w-4 h-4 text-[#f35815]" />
            <span>VIEW ALL ARTICLES ({posts.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#f35815]" />
          </Link>
        </div>
      </section>
    </>
  );
};
