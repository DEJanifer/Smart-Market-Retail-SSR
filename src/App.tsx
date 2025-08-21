
import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { SitemapProvider, useSitemap } from './contexts/SitemapContext';
import PageLoader from './components/PageLoader';
import ScrollToTop from './components/ScrollToTop';

// Lazy load all the page components for better performance
const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const SolutionsPage = lazy(() => import('./pages/SolutionsPage'));
const MicroMarketsPage = lazy(() => import('./pages/MicroMarketsPage'));
const SmartVendingPage = lazy(() => import('./pages/SmartVendingPage'));
const SmartCoolersPage = lazy(() => import('./pages/SmartCoolersPage'));
const SmartStorePage = lazy(() => import('./pages/SmartStorePage'));
const LocationPage = lazy(() => import('./pages/LocationPage'));
const ServiceAreaPage = lazy(() => import('./pages/ServiceAreaPage'));
const TownPage = lazy(() => import('./pages/TownPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const LocationTemplatePage = lazy(() => import('./pages/LocationTemplatePage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));

function AppContent() {
  const { addRoute } = useSitemap();
  const location = useLocation();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Mark as hydrated after first client render
    setIsHydrated(true);
    addRoute(location.pathname);
  }, [location, addRoute]);

  // During SSR or before hydration, show a consistent loading state
  if (typeof window !== 'undefined' && !isHydrated) {
    return <PageLoader />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/solutions/micro-markets" element={<MicroMarketsPage />} />
        <Route path="/solutions/smart-vending" element={<SmartVendingPage />} />
        <Route path="/solutions/smart-coolers" element={<SmartCoolersPage />} />
        <Route path="/solutions/smart-stores" element={<SmartStorePage />} />
        <Route path="/locations" element={<LocationPage />} />
        <Route path="/service-area" element={<ServiceAreaPage />} />
        <Route path="/service-area/:townName" element={<TownPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:postId" element={<BlogPostPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/locations/:locationSlug" element={<LocationTemplatePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <SitemapProvider>
      <ScrollToTop />
      <AppContent />
    </SitemapProvider>
  );
}

export default App;
