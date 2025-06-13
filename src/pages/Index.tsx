import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { Hero } from '@/components/Hero/Hero';
import { MissionSection } from '@/components/Mission/MissionSection';
import { AboutSection } from '@/components/About/AboutSection';
import { IndustrySection } from '@/components/Industry/IndustrySection';
import Footer from '@/components/Footer/Footer';
import { LiquidGlassContainer } from '@/components/LiquidGlass/LiquidGlassContainer';
import { useNavbarLogic } from '@/components/Navbar/useNavbarLogic';
import { AuroraBackground } from '@/components/common/AuroraBackground'; // Import the new component

const Index = () => {
  const { isScrolled, isHomePage } = useNavbarLogic();

  return (
    // The LiquidGlassContainer already has a relative position, which is perfect
    <LiquidGlassContainer className="min-h-screen flex flex-col relative isolate" withParticles={true}>
      <AuroraBackground /> {/* Add the AuroraBackground component here */}
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
