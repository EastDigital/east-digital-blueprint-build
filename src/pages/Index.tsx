// src/pages/Index.tsx
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { Hero } from '@/components/Hero/Hero';
import { MissionSection } from '@/components/Mission/MissionSection';
import { AboutSection } from '@/components/About/AboutSection';
import SectorsShowcase from '@/components/SectorsShowcase';
import Footer from '@/components/Footer/Footer';
import { LiquidGlassContainer } from '@/components/LiquidGlass/LiquidGlassContainer';
import { useNavbarLogic } from '@/components/Navbar/useNavbarLogic';

const Index = () => {
  const { isScrolled, isHomePage } = useNavbarLogic();

  return (
    <LiquidGlassContainer className="min-h-screen flex flex-col relative isolate" withParticles={true}>
      <div className="relative z-10 flex flex-col">
        <Navbar />
        <Hero />
        <MissionSection />
        <AboutSection />
        <SectorsShowcase />
        <Footer />
      </div>
    </LiquidGlassContainer>
  );
};

export default Index;
