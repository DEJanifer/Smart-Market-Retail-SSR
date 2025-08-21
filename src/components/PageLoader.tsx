import React from 'react';

const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-navy flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-mint border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-peach text-sm">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;