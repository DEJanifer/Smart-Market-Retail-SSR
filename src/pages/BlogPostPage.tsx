import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import NotFoundPage from './NotFoundPage';
import fm from 'front-matter';
import { marked } from 'marked';
import { BlogPost } from '../types/blog';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Share2, 
  Copy,
} from 'lucide-react';

// This eagerly imports all markdown files, which is a more reliable way to access them.
const postModules = import.meta.glob('/src/posts/*.md', { as: 'raw', eager: true });

// We process all posts into a simple lookup object for instant access.
const postsBySlug = Object.values(postModules).reduce((acc, rawContent) => {
  try {
    const { attributes }: { attributes: any } = fm(rawContent);
    if (attributes.slug) {
      acc[attributes.slug] = rawContent;
    }
  } catch (e) {
    console.error("Failed to parse frontmatter from a blog post", e);
  }
  return acc;
}, {} as Record<string, string>);

const BlogPostPage: React.FC = () => {
  const { postId: postSlug } = useParams<{ postId: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState('');

  const postUrl = typeof window !== 'undefined' ? window.location.href : '';

  const copyToClipboard = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    navigator.clipboard.writeText(postUrl).then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    }).catch(() => {
      // Fallback for older browsers
      const dummy = document.createElement('textarea');
      document.body.appendChild(dummy);
      dummy.value = postUrl;
      dummy.select();
      document.execCommand('copy');
      document.body.removeChild(dummy);
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };

  useEffect(() => {
    if (postSlug && postsBySlug[postSlug]) {
      const rawContent = postsBySlug[postSlug];
      const { attributes, body }: { attributes: any; body: string } = fm(rawContent);
      const htmlContent = marked.parse(body);
      setPost({ ...attributes, content: htmlContent });
    } else {
      setPost(null);
    }
    setLoading(false);
  }, [postSlug]);

  if (loading) {
    return (
      <PageLayout title="Loading..." description="Loading blog post.">
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-lavender text-xl">Loading blog post...</p>
        </div>
      </PageLayout>
    );
  }

  if (!post) {
    return <NotFoundPage />;
  }

  // Ensure the blog post content is visible regardless of PageLayout structure
  return (
    <PageLayout
      title={post.metaTitle || post.title}
      description={post.metaDescription || post.summary}
      ogImage={post.imageUrl}  
      ogType="article"
    >
      {/* Main container with explicit width and centering */}
      <div className="w-full max-w-none mx-auto px-4 py-8 md:py-16">
        {/* Content wrapper with background */}
        <div className="bg-navy/40 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
          {/* Inner content with padding */}
          <div className="p-6 md:p-10 lg:p-12">
            {/* Article container with max width for readability */}
            <article className="max-w-4xl mx-auto">
              
              {/* Article header */}
              <header className="mb-8">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-mint mb-6 leading-tight">
                  {post.title}
                </h1>
                
                {/* Meta description if exists */}
                {post.metaDescription && (
                  <div className="border-l-4 border-coral pl-4 mb-6">
                    <p className="text-lg text-lavender/90 italic">
                      {post.metaDescription}
                    </p>
                  </div>
                )}
                
                {/* Post metadata */}
                <div className="flex flex-wrap items-center gap-4 text-peach">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-coral" />
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4 text-coral" />
                    <span>{post.author}</span>
                  </div>
                </div>
              </header>

              {/* Featured image */}
              {post.imageUrl && (
                <div className="mb-8 rounded-lg overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-auto object-cover"
                    style={{ maxHeight: '1000px' }}
                  />
                </div>
              )}

              {/* Share buttons */}
              <div className="flex flex-wrap items-center gap-3 p-4 bg-navy/50 rounded-lg mb-8">
                <span className="font-semibold text-mint flex items-center">
                  <Share2 className="mr-2 h-5 w-5" />
                  Share:
                </span>
                <div className="flex gap-2">
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                  </a>
                  <a 
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 rounded-full hover:bg-gray-900 transition-colors"
                    aria-label="Share on X"
                  >
                    <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zm-1.61 19.932h2.527L5.41 2.654H2.748l14.543 18.431z"/>
                    </svg>
                  </a>
                  <a 
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.metaDescription || post.summary || '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-700 rounded-full hover:bg-blue-800 transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                    </svg>
                  </a>
                  <a 
                    href={`https://www.reddit.com/submit?url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-orange-600 rounded-full hover:bg-orange-700 transition-colors"
                    aria-label="Share on Reddit"
                  >
                    <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2.25 12.065c0-.577.486-1.045 1.08-1.045s1.08.468 1.08 1.045c0 .577-.486 1.045-1.08 1.045s-1.08-.468-1.08-1.045zm3.503 0c0-.577.486-1.045 1.08-1.045s1.08.468 1.08 1.045c0 .577-.486 1.045-1.08 1.045s-1.08-.468-1.08-1.045zm5.016 3.354c-.188.424-.606.71-1.08.71h-9.478c-.474 0-.892-.286-1.08-.71-.188-.423-.132-1.03.143-1.404.276-.375.717-.596 1.196-.596h9.078c.479 0 .92.221 1.196.596.275.374.331.981.145 1.404zm-12.752-3.419c-.276-.375-.22-1.03.144-1.404.275-.375.716-.596 1.196-.596h.938c-.152.313-.247.663-.247 1.045v.001c0 1.194.984 2.165 2.196 2.165.253 0 .494-.044.719-.125.286.634.925 1.08 1.675 1.08s1.389-.446 1.675-1.08c.225.081.466.125.719.125 1.212 0 2.196-.971 2.196-2.165v-.001c0-.382-.095-.732-.247-1.045h.938c.48 0 .921.221 1.196.596.364.374.42.98.144 1.404-.188.424-.606.71-1.08.71h-9.478c-.474 0-.892-.286-1.08-.71z"/>
                    </svg>
                  </a>
                  <button 
                    onClick={copyToClipboard}
                    className="p-2 bg-gray-500 rounded-full hover:bg-gray-600 transition-colors relative"
                    aria-label="Copy link"
                  >
                    <Copy className="w-5 h-5 text-white" />
                    {copySuccess && (
                      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-mint text-navy text-xs font-semibold rounded px-2 py-1 whitespace-nowrap">
                        {copySuccess}
                      </span>
                    )}
                  </button>
                </div>
              </div>
              
              {/* Article content */}
              <div 
                className="prose prose-invert prose-lg lg:prose-xl max-w-none
                  prose-headings:text-mint prose-headings:font-bold
                  prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg
                  prose-p:text-lavender/90 prose-p:leading-relaxed prose-p:mb-4
                  prose-a:text-mint prose-a:no-underline hover:prose-a:text-coral prose-a:transition-colors
                  prose-strong:text-peach prose-strong:font-semibold
                  prose-em:text-peach/90
                  prose-ul:text-lavender/80 prose-li:text-lavender/80
                  prose-ol:text-lavender/80
                  prose-blockquote:border-l-4 prose-blockquote:border-coral prose-blockquote:pl-4
                  prose-blockquote:text-peach/80 prose-blockquote:italic
                  prose-code:text-mint prose-code:bg-navy/50 prose-code:px-1 prose-code:rounded
                  prose-pre:bg-navy/50 prose-pre:text-lavender/90
                  space-y-6"
                dangerouslySetInnerHTML={{ __html: post.content }} 
              />
            </article>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BlogPostPage;