
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { HeroSection } from '@/components/Impact/HeroSection';
import { ShowreelSection } from '@/components/Impact/ShowreelSection';
import { PortfolioSection } from '@/components/Impact/PortfolioSection';
import { LiquidGlassContainer } from '@/components/LiquidGlass/LiquidGlassContainer';

const Impact = () => {
  return (
    <LiquidGlassContainer className="min-h-screen" withParticles={true}>
      <Navbar />
      
      <main className="relative overflow-hidden">
        <HeroSection />
        <ShowreelSection />
        <PortfolioSection />
      </main>

      <Footer />
    </LiquidGlassContainer>
  );
};

export default Impact;
