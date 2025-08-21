import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { SitemapProvider, useSitemap } from './contexts/SitemapContext';
import ScrollToTop from './components/ScrollToTop';

// Direct imports instead of lazy loading for SSR compatibility
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import SolutionsPage from './pages/SolutionsPage';
import MicroMarketsPage from './pages/MicroMarketsPage';
import SmartVendingPage from './pages/SmartVendingPage';
import SmartCoolersPage from './pages/SmartCoolersPage';
import SmartStorePage from './pages/SmartStorePage';
import LocationPage from './pages/LocationPage';
import ServiceAreaPage from './pages/ServiceAreaPage';
import TownPage from './pages/TownPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import NotFoundPage from './pages/NotFoundPage';
import LocationTemplatePage from './pages/LocationTemplatePage';
import FAQPage from './pages/FAQPage';

function AppContent() {
  const { addRoute } = useSitemap();
  const location = useLocation();

  useEffect(() => {
    addRoute(location.pathname);
  }, [location, addRoute]);

  return (
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