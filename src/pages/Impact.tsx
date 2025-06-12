
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { HeroSection } from '@/components/Impact/HeroSection';
import { ShowreelSection } from '@/components/Impact/ShowreelSection';
import { PortfolioSection } from '@/components/Impact/PortfolioSection';
import { LiquidGlassContainer } from '@/components/LiquidGlass/LiquidGlassContainer';
import { InteractiveAurora } from '@/components/Aurora/InteractiveAurora';
import { useNavbarLogic } from '@/components/Navbar/useNavbarLogic';
import { cn } from '@/lib/utils';

const Impact = () => {
  const { isScrolled, isHomePage } = useNavbarLogic();
  const showAurora = !isScrolled; // Show aurora when not scrolled

  return (
    <LiquidGlassContainer className="min-h-screen flex flex-col relative isolate" withParticles={true}>
      {/* Enhanced Aurora Background - consistent with homepage */}
      <div
        className={cn(
          'fixed inset-0 transition-opacity duration-500 z-0',
          showAurora ? 'opacity-100' : 'opacity-40'
        )}
      >
        <InteractiveAurora intensity="high" />
      </div>

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
