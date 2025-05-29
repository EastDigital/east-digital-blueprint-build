
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { HeroSection } from '@/components/Impact/HeroSection';
import { ShowreelSection } from '@/components/Impact/ShowreelSection';
import { PortfolioSection } from '@/components/Impact/PortfolioSection';

const Impact = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black relative overflow-hidden">
      {/* Subtle Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-eastdigital-orange/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-l from-eastdigital-orange/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-b from-eastdigital-orange/10 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
      </div>

      <Navbar />
      
      <HeroSection />
      <ShowreelSection />
      <PortfolioSection />

      <Footer />
    </div>
  );
};

export default Impact;
