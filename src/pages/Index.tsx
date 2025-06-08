
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { Hero } from '@/components/Hero/Hero';
import { VisionToRealitySection } from '@/components/VisionToReality/VisionToRealitySection';
import { AboutSection } from '@/components/About/AboutSection';
import { IndustrySection } from '@/components/Industry/IndustrySection';
import Footer from '@/components/Footer/Footer';
import { useNavbarLogic } from '@/components/Navbar/useNavbarLogic';
import { cn } from '@/lib/utils';

const Index = () => {
  const { isScrolled, isHomePage } = useNavbarLogic();
  const showAurora = isHomePage && !isScrolled;

  return (
    <div className="min-h-screen flex flex-col bg-eastdigital-dark relative isolate">
      <div
        className={cn(
          'aurora-background fixed inset-0 transition-opacity duration-500',
          showAurora ? 'opacity-100' : 'opacity-0'
        )}
      />

      <div className="relative z-10 flex flex-col">
        <Navbar />
        <Hero />
        <VisionToRealitySection />
        <AboutSection />
        <IndustrySection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
