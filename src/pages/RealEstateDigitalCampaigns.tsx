import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { Button } from '@/components/ui/button';
import { Target, Camera, Users } from 'lucide-react';

const RealEstateDigitalCampaigns = () => {
  return (
    <div className="min-h-screen flex flex-col bg-eastdigital-dark">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] sm:min-h-[60vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&crop=center')",
              backgroundPosition: 'center 40%'
            }}
          ></div>
          
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/70"></div>
          
          <div className="relative z-10 container mx-auto px-4 text-center py-8 sm:py-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white font-poppins tracking-tight">
              REAL ESTATE DIGITAL CAMPAIGNS
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-6 sm:mb-8 px-2 sm:px-4 leading-relaxed">
              Drive Leads & Sales with Strategic Digital Campaigns
            </p>
            <Button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg rounded-[60px]">
              Launch Your Campaign
            </Button>
          </div>
        </section>

        {/* Services Grid */}
        <section className="container mx-auto px-4 py-16" style={{ backgroundColor: '#141414' }}>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Targeted Facebook & Google Ads */}
            <div id="targeted-ads" className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Target className="h-8 w-8 text-eastdigital-orange mr-3" />
                <h3 className="text-2xl font-bold text-white">Targeted Facebook & Google Ads</h3>
              </div>
              <p className="text-eastdigital-lightgray mb-6 leading-relaxed">
                Reach qualified buyers and investors with precision-targeted advertising campaigns across Facebook and Google platforms.
              </p>
              <ul className="space-y-3 text-eastdigital-lightgray">
                <li>• Demographic & Interest Targeting</li>
                <li>• A/B Testing Optimization</li>
                <li>• Real-time Performance Tracking</li>
                <li>• ROI-focused Campaign Management</li>
              </ul>
            </div>

            {/* Drone Videography */}
            <div id="drone-videography" className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Camera className="h-8 w-8 text-eastdigital-orange mr-3" />
                <h3 className="text-2xl font-bold text-white">Drone Videography</h3>
              </div>
              <p className="text-eastdigital-lightgray mb-6 leading-relaxed">
                Capture stunning aerial footage that showcases properties from unique perspectives, highlighting location advantages and property scale.
              </p>
              <ul className="space-y-3 text-eastdigital-lightgray">
                <li>• 4K Aerial Photography</li>
                <li>• Cinematic Video Production</li>
                <li>• Location Context Shots</li>
                <li>• Licensed Drone Operations</li>
              </ul>
            </div>

            {/* Broker & Investor Outreach */}
            <div id="broker-investor-outreach" className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Users className="h-8 w-8 text-eastdigital-orange mr-3" />
                <h3 className="text-2xl font-bold text-white">Broker & Investor Outreach</h3>
              </div>
              <p className="text-eastdigital-lightgray mb-6 leading-relaxed">
                Connect with key decision-makers through strategic outreach campaigns designed to build relationships and generate qualified leads.
              </p>
              <ul className="space-y-3 text-eastdigital-lightgray">
                <li>• Personalized Email Campaigns</li>
                <li>• LinkedIn Networking Strategies</li>
                <li>• Database Building & Management</li>
                <li>• Relationship Nurturing Systems</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="container mx-auto px-4 py-16" style={{ backgroundColor: '#222222' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Proven Results
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="text-3xl font-bold text-eastdigital-orange mb-2">250%</div>
              <div className="text-eastdigital-lightgray">Average Lead Increase</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="text-3xl font-bold text-eastdigital-orange mb-2">40%</div>
              <div className="text-eastdigital-lightgray">Faster Sales Cycles</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="text-3xl font-bold text-eastdigital-orange mb-2">15x</div>
              <div className="text-eastdigital-lightgray">Return on Ad Spend</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="text-3xl font-bold text-eastdigital-orange mb-2">85%</div>
              <div className="text-eastdigital-lightgray">Client Retention Rate</div>
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section className="container mx-auto px-4 py-16" style={{ backgroundColor: '#141414' }}>
          <div className="bg-gradient-to-r from-eastdigital-orange/10 to-eastdigital-orange/5 border border-eastdigital-orange/20 rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 text-center">
              Perfect For
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-center">
              <div>
                <h3 className="text-xl font-semibold text-eastdigital-orange mb-3">Developers</h3>
                <p className="text-eastdigital-lightgray">Generate qualified leads and accelerate pre-sales for new developments</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-eastdigital-orange mb-3">Brokers</h3>
                <p className="text-eastdigital-lightgray">Build your network and establish authority in the market with targeted outreach</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16" style={{ backgroundColor: '#222222' }}>
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Scale Your Sales?
            </h2>
            <p className="text-xl text-eastdigital-lightgray mb-8 max-w-2xl mx-auto">
              Let's create targeted campaigns that convert prospects into buyers and grow your real estate business.
            </p>
            <Button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white px-8 py-3 text-lg rounded-[60px]">
              Get Your Blueprint
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RealEstateDigitalCampaigns;
