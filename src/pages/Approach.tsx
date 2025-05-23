
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';

const Approach = () => {
  return (
    <div className="min-h-screen flex flex-col bg-eastdigital-dark">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Our Approach
          </h1>
          <p className="text-xl text-eastdigital-lightgray max-w-3xl mx-auto">
            Learn about our process and how we deliver exceptional results for our clients.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Approach;
