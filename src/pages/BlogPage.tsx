import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import fm from 'front-matter';
import { ArrowRight, ArrowUpDown, User, Calendar } from 'lucide-react';
import { BlogPost } from '../types/blog';

// This uses Vite's 'import.meta.glob' to automatically find all .md files in the posts directory.
// The 'eager: true' part ensures the files are loaded immediately.
const postModules = import.meta.glob('/src/posts/*.md', { as: 'raw', eager: true });

// This now correctly maps over the post content and extracts the metadata (attributes).
const posts: BlogPost[] = Object.values(postModules).map((rawContent) => {
  const { attributes }: { attributes: any } = fm(rawContent);
  return attributes;
}).filter(post => post && post.title); // Ensure we only show posts that have a title

const BlogPage: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const sortedPosts = useMemo(() => {
    const sorted = [...posts].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    return sorted;
  }, [sortOrder]);

  return (
    <PageLayout
      title="Smart Market Retail Blog"
      description="Stay updated with the latest news, tips, and insights on smart vending, micro markets, and workplace amenities from Smart Market Retail."
    >
      {/* Main container - mobile-first with minimal padding on mobile */}
      <div className="w-full max-w-none mx-auto px-2 sm:px-4 py-6 sm:py-8 md:py-16">
        {/* Header section with background for visibility - mobile optimized */}
        <div className="bg-navy/40 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-xl overflow-hidden mb-6 sm:mb-8 mx-2 sm:mx-0">
          <div className="p-4 sm:p-6 md:p-10 lg:p-12">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-mint mb-3 sm:mb-4">
                Smart Vending & Micro Market 
                <br /><span className="text-coral">Insights Blog</span>
              </h1>
              <p className="text-base sm:text-lg text-lavender/80 max-w-4xl mx-auto px-2 leading-relaxed">
                Discover how to bring fresh grab-and-go meals, indulgent snacks, refreshing beverages, and 
                bean-to-cup coffee experiences directly to your workplace. Get insights on using AI-powered smart vending and micro market solutions to create exceptional 
                employee and guest experiences for your business.
              </p>
            </div>

            {/* Sort controls - mobile optimized */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="flex items-center gap-1 sm:gap-2 bg-navy/50 rounded-lg p-1 w-full max-w-sm sm:w-auto">
                <button
                  onClick={() => setSortOrder('newest')}
                  className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-md transition-all text-sm sm:text-base flex-1 sm:flex-initial justify-center ${
                    sortOrder === 'newest' 
                      ? 'bg-mint text-navy font-semibold' 
                      : 'text-lavender hover:text-mint'
                  }`}
                >
                  <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Newest First</span>
                  <span className="sm:hidden">Newest</span>
                </button>
                <button
                  onClick={() => setSortOrder('oldest')}
                  className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-md transition-all text-sm sm:text-base flex-1 sm:flex-initial justify-center ${
                    sortOrder === 'oldest' 
                      ? 'bg-mint text-navy font-semibold' 
                      : 'text-lavender hover:text-mint'
                  }`}
                >
                  <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Oldest First</span>
                  <span className="sm:hidden">Oldest</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Blog posts grid - responsive layout */}
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-4 sm:gap-6 md:gap-8">
            {sortedPosts.length > 0 ? sortedPosts.map((post) => (
              <div key={post.slug} className="bg-navy/30 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center transition-transform transform hover:scale-[1.01] sm:hover:scale-[1.02]">
                {/* Image container - full width on mobile, 1/3 width on desktop */}
                <div className="w-full md:w-1/3 h-48 md:h-64">
                  <Link to={`/blog/${post.slug}`} className="block h-full">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                  </Link>
                </div>
                
                {/* Content container - nearly full width on mobile, 2/3 width on desktop */}
                <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 w-full md:w-2/3">
                  <Link to={`/blog/${post.slug}`}>
                    <h2 className="text-xl sm:text-2xl font-bold text-mint hover:text-coral transition-colors mb-2 leading-tight">
                      {post.title}
                    </h2>
                  </Link>
                
                {/* Post metadata */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base text-peach mb-2">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-coral" />
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
                  <div className="flex items-center">
                    <User className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-coral" />
                    <span>{post.author}</span>
                  </div>
                </div>

                  <p className="text-sm sm:text-base text-lavender/80 mb-4 leading-relaxed">
                    {post.summary}
                  </p>
                  <Link 
                    to={`/blog/${post.slug}`} 
                    className="inline-flex items-center font-semibold text-coral hover:text-mint transition-colors text-sm sm:text-base"
                  >
                    Read More <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </div>
              </div>
            )) : (
              <div className="bg-navy/30 rounded-lg p-6 sm:p-8 mx-2 sm:mx-0">
                <p className="text-center text-lavender text-sm sm:text-base">
                  No blog posts found. Please ensure your markdown files are in the /src/posts/ directory and have correct frontmatter.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BlogPage;