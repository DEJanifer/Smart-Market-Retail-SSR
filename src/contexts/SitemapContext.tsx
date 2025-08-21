import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Define the shape of the context's value for TypeScript
interface SitemapContextType {
  routes: string[];
  addRoute: (path: string) => void;
}

// Create the context with an initial value of undefined
const SitemapContext = createContext<SitemapContextType | undefined>(undefined);

// Create a provider component
export const SitemapProvider = ({ children }: { children: ReactNode }) => {
  const [routes, setRoutes] = useState<string[]>([]);

  // The addRoute function adds a new path to the sitemap if it doesn't already exist.
  const addRoute = useCallback((path: string) => {
    setRoutes(prevRoutes => {
      if (prevRoutes.includes(path)) {
        return prevRoutes;
      }
      return [...prevRoutes, path];
    });
  }, []);

  // --- FIX ---
  // The value provided to the context now correctly includes the `addRoute` function.
  const value = { routes, addRoute };

  return (
    <SitemapContext.Provider value={value}>
      {children}
    </SitemapContext.Provider>
  );
};

// Custom hook to use the sitemap context
export const useSitemap = () => {
  const context = useContext(SitemapContext);
  // Ensure the hook is used within a SitemapProvider
  if (context === undefined) {
    throw new Error('useSitemap must be used within a SitemapProvider');
  }
  return context;
};