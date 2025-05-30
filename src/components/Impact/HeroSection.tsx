
import React from 'react';
import { Award, Users, Target, Calendar } from 'lucide-react';

const stats = [
  { icon: Award, value: '150+', label: 'Projects Completed' },
  { icon: Users, value: '80+', label: 'Happy Clients' },
  { icon: Target, value: '95%', label: 'Success Rate' },
  { icon: Calendar, value: '5+', label: 'Years Experience' }
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[60vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&h=1080&fit=crop&crop=center')",
          backgroundPosition: 'center 40%'
        }}
      ></div>
      
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/70"></div>
      
      <div className="relative z-10 container mx-auto px-4 text-center py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 font-poppins tracking-tight">
          Our Impact
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-6 sm:mb-8 lg:mb-12 px-2 sm:px-4">
          Transforming real estate marketing through innovative design, strategic campaigns, and cutting-edge technology solutions that drive measurable results.
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-eastdigital-orange mx-auto mb-1 sm:mb-2 lg:mb-3" />
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/80 text-xs sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
