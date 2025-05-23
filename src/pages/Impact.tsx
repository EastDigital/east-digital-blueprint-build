
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';

const Impact = () => {
  return (
    <div className="min-h-screen flex flex-col bg-eastdigital-dark">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Our Impact
          </h1>
          <p className="text-xl text-eastdigital-lightgray max-w-3xl mx-auto">
            Discover how our solutions have transformed businesses and elevated brands.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Impact;
