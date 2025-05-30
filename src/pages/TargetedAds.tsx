
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { Button } from '@/components/ui/button';
import { Target, TrendingUp, Users, CheckCircle } from 'lucide-react';

const TargetedAds = () => {
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
              TARGETED FACEBOOK & GOOGLE ADS
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-6 sm:mb-8 px-2 sm:px-4 leading-relaxed">
              Reach qualified buyers and investors with precision-targeted advertising campaigns
            </p>
            <Button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg rounded-[60px]">
              Launch Your Campaign
            </Button>
          </div>
        </section>

        {/* Service Details */}
        <section className="container mx-auto px-4 py-16" style={{ backgroundColor: '#141414' }}>
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Precision-Targeted Real Estate Marketing
              </h2>
              <p className="text-eastdigital-lightgray mb-6 leading-relaxed text-lg">
                Our targeted advertising campaigns leverage advanced demographic and interest targeting to reach qualified buyers and investors exactly when they're looking for properties. We optimize campaigns in real-time to maximize your ROI.
              </p>
              <ul className="space-y-3 text-eastdigital-lightgray">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>Advanced demographic and interest targeting</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>A/B testing for optimal performance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>Real-time performance tracking and optimization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-eastdigital-orange mt-1 mr-3 flex-shrink-0" />
                  <span>ROI-focused campaign management</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <Target className="h-12 w-12 text-eastdigital-orange mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Campaign Features</h3>
              <ul className="space-y-3 text-eastdigital-lightgray">
                <li>• Custom audience creation and lookalikes</li>
                <li>• Retargeting website visitors and leads</li>
                <li>• Geographic and behavioral targeting</li>
                <li>• Lead form optimization</li>
                <li>• Conversion tracking and analytics</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="container mx-auto px-4 py-16" style={{ backgroundColor: '#222222' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Proven Results
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center">
              <TrendingUp className="h-8 w-8 text-eastdigital-orange mx-auto mb-3" />
              <div className="text-3xl font-bold text-eastdigital-orange mb-2">300%</div>
              <div className="text-eastdigital-lightgray">Average Lead Increase</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center">
              <Target className="h-8 w-8 text-eastdigital-orange mx-auto mb-3" />
              <div className="text-3xl font-bold text-eastdigital-orange mb-2">65%</div>
              <div className="text-eastdigital-lightgray">Lower Cost Per Lead</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center">
              <Users className="h-8 w-8 text-eastdigital-orange mx-auto mb-3" />
              <div className="text-3xl font-bold text-eastdigital-orange mb-2">20x</div>
              <div className="text-eastdigital-lightgray">Return on Ad Spend</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center">
              <CheckCircle className="h-8 w-8 text-eastdigital-orange mx-auto mb-3" />
              <div className="text-3xl font-bold text-eastdigital-orange mb-2">92%</div>
              <div className="text-eastdigital-lightgray">Client Satisfaction Rate</div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16" style={{ backgroundColor: '#141414' }}>
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Scale Your Lead Generation?
            </h2>
            <p className="text-xl text-eastdigital-lightgray mb-8 max-w-2xl mx-auto">
              Let's create targeted ad campaigns that connect you with qualified buyers and investors, driving real results for your real estate business.
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

export default TargetedAds;
