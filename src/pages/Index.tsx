// force rebuild
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
  // Logic to determine if the aurora should be visible
  const { isScrolled, isHomePage } = useNavbarLogic();
  const showAurora = isHomePage && !isScrolled;

  return (
    // The `isolate` class is crucial. It creates a new stacking context,
    // which makes the z-index logic inside work reliably.
    <div className="min-h-screen flex flex-col bg-eastdigital-dark relative isolate">
      {/* The Aurora background effect container. It sits at the bottom of the stack. */}

      // In pages/Index.tsx

<div className="min-h-screen flex flex-col bg-eastdigital-dark relative isolate test-red-background">
  
  {/* The rest of your code inside this div... */}
  {/* <div className="aurora-background ... /> */}
  {/* <div className="relative z-10 ... /> */}
  
</div>

      
      <div
        className={cn(
          'aurora-background fixed inset-0 transition-opacity duration-500',
          showAurora ? 'opacity-100' : 'opacity-0'
        )}
      />

      {/* This wrapper contains all visible content and uses z-10 to sit on top of the aurora effect. */}
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
