
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { Hero } from '@/components/Hero/Hero';
import { MissionSection } from '@/components/Mission/MissionSection';
import { AboutSection } from '@/components/About/AboutSection';
import { IndustrySection } from '@/components/Industry/IndustrySection';
import Footer from '@/components/Footer/Footer';
import { LiquidGlassContainer } from '@/components/LiquidGlass/LiquidGlassContainer';
import { InteractiveAurora } from '@/components/Aurora/InteractiveAurora';
import { useNavbarLogic } from '@/components/Navbar/useNavbarLogic';
import { cn } from '@/lib/utils';

const Index = () => {
  const { isScrolled, isHomePage } = useNavbarLogic();
  const showAurora = isHomePage && !isScrolled;

  return (
    <LiquidGlassContainer className="min-h-screen flex flex-col relative isolate" withParticles={true}>
      {/* Enhanced Aurora Background */}
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
        <Hero />
        <MissionSection />
        <AboutSection />
        <IndustrySection />
        <Footer />
      </div>
    </LiquidGlassContainer>
  );
};

export default Index;
