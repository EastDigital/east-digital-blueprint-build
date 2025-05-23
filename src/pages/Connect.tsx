
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';

const Connect = () => {
  return (
    <div className="min-h-screen flex flex-col bg-eastdigital-dark">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Connect With Us
          </h1>
          <p className="text-xl text-eastdigital-lightgray max-w-3xl mx-auto">
            Get in touch to discuss how we can help bring your vision to life.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Connect;
