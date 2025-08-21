
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';
import './utils/animations.css';

// Swiper CSS imports
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const container = document.getElementById('root')!;

// Check if the app was server-rendered by looking for the data attribute we set in entry-server.tsx
const isServerRendered = container.hasChildNodes() && container.firstElementChild?.getAttribute('data-server-rendered') === 'true';

const AppWrapper = () => (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

if (isServerRendered) {
  // Hydrate the server-rendered content
  hydrateRoot(container, <AppWrapper />);
} else {
  // Fall back to client-side rendering (for CSR dev mode)
  createRoot(container).render(<AppWrapper />);
}
