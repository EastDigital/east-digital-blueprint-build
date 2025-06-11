
import React from 'react';
import { LiquidGlassContainer } from '@/components/LiquidGlass/LiquidGlassContainer';
import { ContactForm } from '@/components/Contact/ContactForm';
import { LiquidGlassCard } from '@/components/LiquidGlass/LiquidGlassCard';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Connect = () => {
  return (
    <LiquidGlassContainer className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Let's Connect
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to bring your vision to life? We're here to help you create something extraordinary.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <div className="space-y-6">
            <LiquidGlassCard className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-eastdigital-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-eastdigital-orange" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Email Us</h3>
                  <p className="text-gray-300 mb-2">
                    Get in touch via email for detailed discussions
                  </p>
                  <a 
                    href="mailto:info@eastdigital.in" 
                    className="text-eastdigital-orange hover:text-white transition-colors"
                  >
                    info@eastdigital.in
                  </a>
                </div>
              </div>
            </LiquidGlassCard>

            <LiquidGlassCard className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-eastdigital-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-eastdigital-orange" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Call Us</h3>
                  <p className="text-gray-300 mb-2">
                    Speak directly with our team
                  </p>
                  <a 
                    href="tel:+1234567890" 
                    className="text-eastdigital-orange hover:text-white transition-colors"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
            </LiquidGlassCard>

            <LiquidGlassCard className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-eastdigital-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-eastdigital-orange" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Visit Us</h3>
                  <p className="text-gray-300">
                    123 Creative Street<br />
                    Digital City, DC 12345<br />
                    United States
                  </p>
                </div>
              </div>
            </LiquidGlassCard>

            <LiquidGlassCard className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-eastdigital-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-eastdigital-orange" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Office Hours</h3>
                  <div className="text-gray-300 space-y-1">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </LiquidGlassCard>
          </div>
        </div>

        <LiquidGlassCard className="max-w-4xl mx-auto p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-300 text-lg">
            We typically respond to all inquiries within 24 hours. For urgent matters, 
            feel free to call us directly. We're excited to learn about your vision and 
            help bring it to life.
          </p>
        </LiquidGlassCard>
      </div>
    </LiquidGlassContainer>
  );
};

export default Connect;
