
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { Hero } from '@/components/Hero/Hero';
import { AboutSection } from '@/components/About/AboutSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-eastdigital-dark">
      <Navbar />
      <Hero />
      <AboutSection />
    </div>
  );
};

export default Index;
