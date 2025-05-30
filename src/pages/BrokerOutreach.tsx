
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { Button } from '@/components/ui/button';
import { Users, Mail, MessageSquare, CheckCircle } from 'lucide-react';

const BrokerOutreach = () => {
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
              backgroundImage: "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&h=1080&fit=crop&crop=center')",
              backgroundPosition: 'center 40%'
            }}
          ></div>
          
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/70"></div>
          
          <div className="relative z-10 container mx-auto px-4 text-center py-8 sm:py-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white font-poppins tracking-tight">
              BROKER & INVESTOR OUTREACH
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-6 sm:mb-8 px-2 sm:px-4 leading-relaxed">
              Connect with key decision-makers through strategic outreach campaigns
            </p>
            <Button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg rounded-[60px]">
              Start Your Campaign
            </Button>
          </div>
        </section>

        {/* Service Details */}
        <section className="container mx-auto px-4 py-16" style={{ backgroundColor: '#141414' }}>
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Strategic Relationship Building
              </h2>
              <p className="text-eastdigital-lightgray mb-6 leading-relaxed text-lg">
                Our broker and investor outreach campaigns are designed to build meaningful relationships with key decision-makers in the real estate industry. We use personalized, multi-channel approaches to connect you with qualified leads and potential partners.
              </p>
              <ul className="space-y-3 text-eastdigital-lightgray">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>Personalized email campaigns with high open rates</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>LinkedIn networking and outreach strategies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>Database building and contact management</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>Relationship nurturing and follow-up systems</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <Users className="h-12 w-12 text-eastdigital-orange mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Outreach Channels</h3>
              <ul className="space-y-3 text-eastdigital-lightgray">
                <li>• Email marketing automation</li>
                <li>• LinkedIn InMail campaigns</li>
                <li>• Phone outreach and follow-ups</li>
                <li>• Industry event networking</li>
                <li>• Referral partner programs</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Strategy & Process */}
        <section className="container mx-auto px-4 py-16" style={{ backgroundColor: '#222222' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Our Outreach Strategy
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-eastdigital-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Research & Targeting</h3>
              <p className="text-eastdigital-lightgray">Identify and research qualified brokers and investors in your target markets</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-eastdigital-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Personalization</h3>
              <p className="text-eastdigital-lightgray">Create personalized messaging that resonates with each contact's specific interests</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-eastdigital-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Multi-Channel Outreach</h3>
              <p className="text-eastdigital-lightgray">Execute coordinated campaigns across email, LinkedIn, and phone channels</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-eastdigital-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Relationship Nurturing</h3>
              <p className="text-eastdigital-lightgray">Build and maintain long-term relationships through consistent follow-up</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16" style={{ backgroundColor: '#141414' }}>
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Build Your Network?
            </h2>
            <p className="text-xl text-eastdigital-lightgray mb-8 max-w-2xl mx-auto">
              Let's create strategic outreach campaigns that connect you with the right brokers and investors, building valuable relationships that drive your business forward.
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

export default BrokerOutreach;
