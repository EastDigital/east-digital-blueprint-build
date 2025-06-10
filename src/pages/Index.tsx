
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { Hero } from '@/components/Hero/Hero';
import { MissionSection } from '@/components/Mission/MissionSection';
import { AboutSection } from '@/components/About/AboutSection';
import { IndustrySection } from '@/components/Industry/IndustrySection';
import Footer from '@/components/Footer/Footer';
import { LiquidGlassContainer } from '@/components/LiquidGlass/LiquidGlassContainer';
import { useNavbarLogic } from '@/components/Navbar/useNavbarLogic';
import { cn } from '@/lib/utils';

const Index = () => {
  const { isScrolled, isHomePage } = useNavbarLogic();
  const showAurora = isHomePage && !isScrolled;

  return (
    <LiquidGlassContainer className="min-h-screen flex flex-col relative isolate" withParticles={true}>
      <div
        className={cn(
          'aurora-background fixed inset-0 transition-opacity duration-500',
          showAurora ? 'opacity-100' : 'opacity-0'
        )}
      />

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
