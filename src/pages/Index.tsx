import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { Hero } from '@/components/Hero/Hero';
import { VisionToRealitySection } from '@/components/VisionToReality/VisionToRealitySection';
import { AboutSection } from '@/components/About/AboutSection';
import { IndustrySection } from '@/components/Industry/IndustrySection';
import Footer from '@/components/Footer/Footer';
import AuroraBackground from '@/components/AuroraBackground';
import { useNavbarLogic } from '@/components/Navbar/useNavbarLogic'; // We need the hook here now

const Index = () => {
  // Logic to determine if the aurora should be visible
  const { isScrolled, isHomePage } = useNavbarLogic();
  const showAurora = isHomePage && !isScrolled;

  return (
    // The main container needs `isolate` to create a new stacking context
    <div className="min-h-screen flex flex-col bg-eastdigital-dark relative isolate">
      <AuroraBackground isVisible={showAurora} />
      <Navbar />
      <Hero />
      <VisionToRealitySection />
      <AboutSection />
      <IndustrySection />
      <Footer />
    </div>
  );
};

export default Index;
