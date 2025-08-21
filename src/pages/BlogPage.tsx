import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import fm from 'front-matter';
import { ArrowRight, ArrowUpDown } from 'lucide-react';
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
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-mint">From the Blog</h1>
            <p className="text-lg text-lavender/80 mt-4 max-w-3xl mx-auto">
              Insights and updates on the future of unattended retail.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-2 bg-navy/30 rounded-lg p-1">
                <button
                  onClick={() => setSortOrder('newest')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                    sortOrder === 'newest' 
                      ? 'bg-mint text-navy' 
                      : 'text-lavender hover:text-mint'
                  }`}
                >
                  <ArrowUpDown className="h-4 w-4" />
                  Newest First
                </button>
                <button
                  onClick={() => setSortOrder('oldest')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                    sortOrder === 'oldest' 
                      ? 'bg-mint text-navy' 
                      : 'text-lavender hover:text-mint'
                  }`}
                >
                  <ArrowUpDown className="h-4 w-4" />
                  Oldest First
                </button>
              </div>
            </div>

            <div className="grid gap-8">
              {sortedPosts.length > 0 ? sortedPosts.map((post) => (
                <div key={post.slug} className="bg-navy/30 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center transition-transform transform hover:scale-105">
                  <div className="md:w-1/3">
                    <Link to={`/blog/${post.slug}`}>
                      <img src={post.imageUrl} alt={post.title} className="w-full h-48 md:h-full object-cover"/>
                    </Link>
                  </div>
                  <div className="p-6 md:w-2/3">
                    <Link to={`/blog/${post.slug}`}>
                      <h2 className="text-2xl font-bold text-mint hover:text-coral transition-colors mb-2">{post.title}</h2>
                    </Link>
                    <p className="text-sm text-peach mb-4">{post.date} by {post.author}</p>
                    <p className="text-lavender/80 mb-4">{post.summary}</p>
                    <Link 
                      to={`/blog/${post.slug}`} 
                      className="inline-flex items-center font-semibold text-coral hover:text-mint"
                    >
                      Read More <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              )) : (
                <p className="text-center text-lavender">No blog posts found. Please ensure your markdown files are in the /src/posts/ directory and have correct frontmatter.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BlogPage;