
import React from 'react';

export const PortfolioHeader = () => {
  return (
    <div className="text-center mb-8 lg:mb-12">
      <div className="inline-flex items-center px-4 py-2 bg-eastdigital-orange/10 border border-eastdigital-orange/20 rounded-full mb-6">
        <span className="text-eastdigital-orange text-sm font-medium tracking-wider uppercase">Portfolio</span>
      </div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
        Featured Projects
      </h2>
      <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8 lg:mb-10 px-4">
        Explore our portfolio of successful real estate marketing campaigns, 3D visualizations, and corporate solutions that have helped our clients achieve exceptional results.
      </p>
    </div>
  );
};
