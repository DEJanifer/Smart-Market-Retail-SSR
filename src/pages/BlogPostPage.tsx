import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PageLayout from '../components/PageLayout';
import NotFoundPage from './NotFoundPage';
import fm from 'front-matter';
import { marked } from 'marked';
import { BlogPost } from '../types/blog';
import { 
  Calendar, 
  User, 
  Share2, 
  Copy,
} from 'lucide-react';

// Eagerly import all markdown files for reliable access during SSR and client-side navigation.
const postModules = import.meta.glob('/src/posts/*.md', { as: 'raw', eager: true });

// Create a lookup object for all posts by their slug for instant access.
const postsBySlug = Object.values(postModules).reduce((acc, rawContent) => {
  try {
    const { attributes }: { attributes: any } = fm(rawContent);
    if (attributes.slug) {
      acc[attributes.slug] = rawContent;
    }
  } catch (e) {
    console.error("Failed to parse frontmatter from a blog post:", e);
  }
  return acc;
}, {} as Record<string, string>);


const BlogPostPage: React.FC = () => {
  const { postId: postSlug } = useParams<{ postId: string }>();
  const [copySuccess, setCopySuccess] = useState('');

  // The base URL of your site, essential for generating absolute URLs for SSR.
  const baseUrl = 'https://smartmarketretail.com';
  
  // Construct the full, absolute URL for the current post. This works on both server and client.
  const postUrl = `${baseUrl}/blog/${postSlug}`;

  // Synchronously get the post data during render (works for both SSR and client-side)
  let post: BlogPost | null = null;
  
  if (postSlug && postsBySlug[postSlug]) {
    try {
      const rawContent = postsBySlug[postSlug];
      const { attributes, body }: { attributes: any; body: string } = fm(rawContent);
      const htmlContent = marked.parse(body);
      post = { ...attributes, content: htmlContent };
    } catch (error) {
      console.error('Error parsing blog post:', error);
      post = null;
    }
  }

  // If no post found, return 404 page immediately
  if (!post) {
    return <NotFoundPage />;
  }
  const copyToClipboard = () => {
    // This function only runs on the client-side where navigator is available.
    navigator.clipboard.writeText(postUrl).then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      // A simple fallback could be added here if needed.
    });
  };


  // --- Meta Tag Preparation ---

  const ogTitle = post.metaTitle || post.title || 'Smart Market Retail Blog';
  const ogDescription = post.metaDescription || post.summary || 'A blog post from Smart Market Retail about modern vending solutions.';
  
  // Helper function to create absolute image URLs, with a fallback to a default image.
  const getAbsoluteImageUrl = (imageUrl?: string) => {
    const defaultImage = `${baseUrl}/Smart Store 700 05.1_large.webp`;
    if (!imageUrl) {
      return defaultImage;
    }
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    return `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
  };
  
  const ogImage = getAbsoluteImageUrl(post.imageUrl);
  
  // Formats date for OG tags, providing a fallback.
  const formatDateForOG = (dateStr?: string) => {
    if (!dateStr) return new Date().toISOString();
    try {
      return new Date(dateStr).toISOString();
    } catch {
      return new Date().toISOString();
    }
  };
  
  const publishedTime = formatDateForOG(post.date);
  const authorName = post.author || 'Smart Market Retail Team';

  return (
    <>
      {/* These Helmet tags provide all the necessary SEO and Open Graph information. */}
      {/* The `prioritize` prop is not a standard prop; `skipMetaTags` on PageLayout is the correct approach. */}
      <Helmet>
        {/* --- Primary Meta Tags --- */}
        <title>{`${ogTitle} | Smart Market Retail`}</title>
        <meta name="description" content={ogDescription} />
        <link rel="canonical" href={postUrl} />
        
        {/* --- Open Graph / Facebook / LinkedIn --- */}
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:secure_url" content={ogImage} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Smart Market Retail" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={ogTitle} />

        {/* --- Article Specific OG Tags --- */}
        <meta property="article:published_time" content={publishedTime} />
        <meta property="article:author" content={authorName} />
        
        {/* --- Twitter Card Tags --- */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={ogTitle} />

        {/* --- JSON-LD Structured Data for Rich Snippets --- */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": ogTitle,
            "description": ogDescription,
            "image": ogImage,
            "datePublished": publishedTime,
            "author": {
              "@type": "Person",
              "name": authorName
            },
            "publisher": {
              "@type": "Organization",
              "name": "Smart Market Retail",
              "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/Logo%20-%20Website.png`
              }
            }
          })}
        </script>
      </Helmet>

      {/* CRITICAL: Pass skipMetaTags={true} to prevent PageLayout from overriding these specific tags. */}
      <PageLayout skipMetaTags={true}>
        <div className="w-full max-w-none mx-auto px-0 sm:px-4 py-8 md:py-16">
          <div className="bg-navy/40 backdrop-blur-sm rounded-none sm:rounded-xl shadow-xl overflow-hidden">
            <div className="p-4 sm:p-6 md:p-8 lg:p-10">
              <article className="max-w-4xl mx-auto">
                
                <header className="mb-6 sm:mb-8">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-mint mb-4 leading-tight">
                    {post.title}
                  </h1>
                  
                  {post.metaDescription && (
                    <div className="border-l-4 border-coral pl-4 mb-6">
                      <p className="text-md sm:text-lg text-lavender/90 italic">
                        {post.metaDescription}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm sm:text-base text-peach">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-coral" />
                      <time dateTime={publishedTime}>{post.date}</time>
                    </div>
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-coral" />
                      <span>{authorName}</span>
                    </div>
                  </div>
                </header>

                {post.imageUrl && (
                  <div className="mb-6 sm:mb-8 -mx-4 sm:mx-0 sm:rounded-lg overflow-hidden">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 p-3 bg-navy/50 rounded-lg mb-6 sm:mb-8">
                  <span className="font-semibold text-mint flex items-center text-base">
                    <Share2 className="mr-2 h-5 w-5" />
                    Share:
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors" aria-label="Share on Facebook">
                      <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-full hover:bg-gray-900 transition-colors" aria-label="Share on X">
                       <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153zm-1.61 19.932h2.527L5.41 2.654H2.748l14.543 18.431z"/></svg>
                    </a>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-700 rounded-full hover:bg-blue-800 transition-colors" aria-label="Share on LinkedIn">
                      <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
                    </a>
                    <button onClick={copyToClipboard} className="p-2 bg-gray-500 rounded-full hover:bg-gray-600 transition-colors relative" aria-label="Copy link">
                      <Copy className="w-5 h-5 text-white" />
                      {copySuccess && <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-mint text-navy text-xs font-semibold rounded px-2 py-1">{copySuccess}</span>}
                    </button>
                  </div>
                </div>
                
                <div 
                  className="prose prose-invert sm:prose-lg max-w-none
+                prose-headings:text-mint prose-a:text-mint prose-strong:text-peach prose-blockquote:border-coral prose-blockquote:text-peach/80"
                  dangerouslySetInnerHTML={{ __html: post.content }} 
                />
              </article>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default BlogPostPage;