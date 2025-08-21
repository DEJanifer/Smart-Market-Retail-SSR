import React, { useMemo } from 'react';
import { ShoppingCart, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as frontMatter from 'front-matter';

// Load all blog posts
const postModules = import.meta.glob('/src/posts/*.md', { eager: true, query: '?raw', import: 'default' });

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  summary?: string;
  content: string;
}

const posts: BlogPost[] = Object.entries(postModules).map(([path, content]) => {
  const parsed = frontMatter.default(content as string);
  const slug = path.split('/').pop()?.replace('.md', '') || '';
  const attributes = parsed.attributes as any;
  return {
    slug,
    title: attributes.title || '',
    date: attributes.date || '',
    author: attributes.author || '',
    summary: attributes.summary || '',
    content: parsed.body
  };
}).filter(post => post.title);

const Footer: React.FC = () => {
  // Get the 3 most recent blog posts
  const recentPosts = useMemo(() => {
    return posts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  }, []);

  return (
    <footer className="bg-navy/40 backdrop-blur-sm border-t border-mint/20 shadow-glow relative z-30">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <ShoppingCart className="h-8 w-8 mr-2 text-mint" />
              <span className="text-xl font-bold text-mint">SMART MARKET RETAIL</span>
            </div>
            <p className="text-lavender/80 mb-4">
              Dedicated to providing an outstanding customer experience by leveraging innovative unattended retail solutions. Our mission is to enhance spaces with modern vending services.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/people/Smart-Market-Retail/61577252497937/" target="_blank" rel="noopener noreferrer" className="text-mint hover:text-coral transition-colors">
                Facebook
              </a>
              <a href="https://x.com/SmrtMrketRetail" target="_blank" rel="noopener noreferrer" className="text-mint hover:text-coral transition-colors">
                X.com
              </a>
              <a href="https://www.instagram.com/smartmarketretail/" target="_blank" rel="noopener noreferrer" className="text-mint hover:text-coral transition-colors">
                Instagram
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-coral">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/solutions" className="text-peach hover:text-mint transition-colors">Solutions</Link></li>
              <li><Link to="/blog" className="text-peach hover:text-mint transition-colors">Blog</Link></li>
              <li><Link to="/faq" className="text-peach hover:text-mint transition-colors">FAQ</Link></li>
              <li><Link to="/about" className="text-peach hover:text-mint transition-colors">About Us</Link></li>
              <li><Link to="/locations" className="text-peach hover:text-mint transition-colors">Prospective Locations</Link></li>
              <li><Link to="/service-area" className="text-peach hover:text-mint transition-colors">Service Area</Link></li>
              <li><Link to="/contact" className="text-peach hover:text-mint transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Recent Blogs */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-coral">Recent Blogs</h3>
            <ul className="space-y-2">
              {recentPosts.map((post) => (
                <li key={post.slug}>
                  <Link 
                    to={`/blog/${post.slug}`} 
                    className="text-mint hover:text-coral transition-colors line-clamp-2"
                    title={post.title}
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-coral">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-mint" />
                <a href="mailto:info@smartmarketretail.com" className="text-peach hover:text-mint transition-colors">
                  info@smartmarketretail.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-mint" />
                <a href="tel:+14102205652" className="text-peach hover:text-mint transition-colors">
                  (410) 220-5652
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-mint" />
                <div className="text-peach">
                  <p className="font-semibold">SMART MARKET RETAIL LLC</p>
                  <p>405 North Center Street</p>
                  <p>STE 25</p>
                  <p>#1034</p>
                  <p>Westminster, MD 21157</p>
                  <p>United States</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-mint/20 text-center text-lavender/60">
          <p>&copy; {new Date().getFullYear()} Smart Market Retail. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
