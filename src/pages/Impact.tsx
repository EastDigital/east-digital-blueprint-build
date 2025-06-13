
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { HeroSection } from '@/components/Impact/HeroSection';
import { ShowreelSection } from '@/components/Impact/ShowreelSection';
import { PortfolioSection } from '@/components/Impact/PortfolioSection';
import { LiquidGlassContainer } from '@/components/LiquidGlass/LiquidGlassContainer';

const Impact = () => {
  return (
    <LiquidGlassContainer className="min-h-screen flex flex-col relative isolate" withParticles={true}>
      <div className="relative z-10 flex flex-col">
        <Navbar />
        
        <main className="relative overflow-hidden">
          <HeroSection />
          <ShowreelSection />
          <PortfolioSection />
        </main>

        <Footer />
      </div>
    </LiquidGlassContainer>
  );
};

export default Impact;
