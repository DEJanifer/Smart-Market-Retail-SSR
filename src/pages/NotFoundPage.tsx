import React from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

const NotFoundPage: React.FC = () => {
  return (
    <PageLayout title="404: Page Not Found | Smart Market Retail" description="The page you are looking for could not be found.">
      <div className="container mx-auto px-4 md:px-6 py-24 text-center min-h-[calc(100vh-10rem)] flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold text-coral mb-4">404</h1>
        <h2 className="text-3xl text-mint mb-6">Page Not Found</h2>
        <p className="text-lavender/80 mb-8 max-w-md">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-gradient-pastel text-navy px-8 py-3 rounded-full font-semibold hover:shadow-neon transition-all"
        >
          Go to Homepage
        </Link>
      </div>
    </PageLayout>
  );
};

export default NotFoundPage;