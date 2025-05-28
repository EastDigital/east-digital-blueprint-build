
import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, Award, Star } from 'lucide-react';

const Impact = () => {
  return (
    <div className="min-h-screen flex flex-col bg-eastdigital-dark">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 lg:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Our Impact
            </h1>
            <p className="text-xl lg:text-2xl text-eastdigital-lightgray max-w-3xl mx-auto">
              Discover how our solutions have transformed businesses and elevated brands across industries.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              <TrendingUp className="h-12 w-12 text-eastdigital-orange mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-eastdigital-lightgray">Projects Delivered</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              <Users className="h-12 w-12 text-eastdigital-orange mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">200+</div>
              <div className="text-eastdigital-lightgray">Happy Clients</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              <Award className="h-12 w-12 text-eastdigital-orange mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-eastdigital-lightgray">Awards Won</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
              <Star className="h-12 w-12 text-eastdigital-orange mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">4.9/5</div>
              <div className="text-eastdigital-lightgray">Client Rating</div>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Success Stories
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Luxury Residential Tower</h3>
              <p className="text-eastdigital-lightgray mb-6 leading-relaxed">
                Our 3D renderings and VR tours helped a premium developer achieve 80% pre-sales before construction began, generating ₹200 crores in bookings.
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-eastdigital-orange">80%</div>
                  <div className="text-sm text-eastdigital-lightgray">Pre-sales Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-eastdigital-orange">₹200Cr</div>
                  <div className="text-sm text-eastdigital-lightgray">Revenue Generated</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Tech Startup Rebranding</h3>
              <p className="text-eastdigital-lightgray mb-6 leading-relaxed">
                Complete brand transformation and digital platform redesign resulted in 300% increase in user engagement and successful Series A funding.
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-eastdigital-orange">300%</div>
                  <div className="text-sm text-eastdigital-lightgray">User Engagement</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-eastdigital-orange">$5M</div>
                  <div className="text-sm text-eastdigital-lightgray">Series A Raised</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-eastdigital-orange fill-current" />
                ))}
              </div>
              <p className="text-eastdigital-lightgray mb-4 italic">
                "East Digital transformed our vision into reality. Their 3D renderings were so realistic that buyers could envision living in the space before we even broke ground."
              </p>
              <div className="text-white font-semibold">Rajesh Kumar</div>
              <div className="text-eastdigital-lightgray text-sm">CEO, Pinnacle Developers</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-eastdigital-orange fill-current" />
                ))}
              </div>
              <p className="text-eastdigital-lightgray mb-4 italic">
                "The digital marketing campaigns increased our property inquiries by 400%. Their strategic approach to targeting the right audience was exceptional."
              </p>
              <div className="text-white font-semibold">Priya Sharma</div>
              <div className="text-eastdigital-lightgray text-sm">Marketing Director, Urban Homes</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-eastdigital-orange fill-current" />
                ))}
              </div>
              <p className="text-eastdigital-lightgray mb-4 italic">
                "Our new brand identity and website have completely transformed how clients perceive our company. The results speak for themselves."
              </p>
              <div className="text-white font-semibold">Amit Patel</div>
              <div className="text-eastdigital-lightgray text-sm">Founder, TechForward Solutions</div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-eastdigital-orange/10 to-eastdigital-orange/5 border border-eastdigital-orange/20 rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Create Your Success Story?
            </h2>
            <p className="text-xl text-eastdigital-lightgray mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who have transformed their businesses with our expertise.
            </p>
            <Button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white px-8 py-3 text-lg rounded-[60px]">
              Get Your Blueprint
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Impact;
