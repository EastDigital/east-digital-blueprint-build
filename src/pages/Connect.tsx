import React, { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
const Connect = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };
  return <div className="min-h-screen flex flex-col bg-eastdigital-dark">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] sm:min-h-[60vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&h=1080&fit=crop&crop=center')",
          backgroundPosition: 'center 40%'
        }}></div>
          
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/70"></div>
          
          <div className="relative z-10 container mx-auto px-4 text-center py-8 sm:py-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white font-poppins tracking-tight">
              Connect With Us
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto mb-6 sm:mb-8 px-2 sm:px-4 leading-relaxed">
              Get in touch to discuss how we can help bring your vision to life.
            </p>
            <Button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg rounded-[60px]">
              Start Conversation
            </Button>
          </div>
        </section>

        <div style={{
        backgroundColor: '#141414'
      }} className="container mx-auto px-4 pb-16 bg-black">
          <div className="grid lg:grid-cols-2 gap-12 py-[44px] bg-black">
            {/* Contact Form */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Let's Start a Conversation</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-white mb-2 font-medium">Name *</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-eastdigital-orange focus:outline-none" placeholder="Your full name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white mb-2 font-medium">Email *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-eastdigital-orange focus:outline-none" placeholder="your@email.com" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-white mb-2 font-medium">Phone</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-eastdigital-orange focus:outline-none" placeholder="+91 12345 67890" />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-white mb-2 font-medium">Company</label>
                    <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-eastdigital-orange focus:outline-none" placeholder="Your company name" />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-white mb-2 font-medium">Service Interested In</label>
                  <select id="service" name="service" value={formData.service} onChange={handleChange} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-eastdigital-orange focus:outline-none">
                    <option value="">Select a service</option>
                    <option value="3d-rendering">3D Rendering & Visualization</option>
                    <option value="digital-campaigns">Real Estate Digital Campaigns</option>
                    <option value="corporate-solutions">Corporate Solutions</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-white mb-2 font-medium">Message *</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={4} className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-eastdigital-orange focus:outline-none resize-vertical" placeholder="Tell us about your project..." />
                </div>

                <Button type="submit" className="w-full bg-eastdigital-orange hover:bg-eastdigital-orange/90 text-white py-3 text-lg rounded-lg flex items-center justify-center">
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-eastdigital-orange mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">Email</h4>
                      <p className="text-eastdigital-lightgray">hello@eastdigital.in</p>
                      
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-eastdigital-orange mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">Phone</h4>
                      <p className="text-eastdigital-lightgray">+91 99105 68689</p>
                      <p className="text-eastdigital-lightgray">0522 568689</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-eastdigital-orange mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">Office</h4>
                      <p className="text-eastdigital-lightgray">
                        2nd Floor, JSV Hyundai Building, <br />
                        Near Engineering College,<br />
                        Lucknow, Uttar Pradesh, INDIA - 226021
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-6 w-6 text-eastdigital-orange mt-1 mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold mb-1">Business Hours</h4>
                      <p className="text-eastdigital-lightgray">
                        Monday - Saturday: 9:00 AM - 6:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Why Choose East Digital?</h3>
                <ul className="space-y-4 text-eastdigital-lightgray">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-eastdigital-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>5+ years of industry experience</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-eastdigital-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>500+ successful projects delivered</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-eastdigital-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Dedicated project management</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-eastdigital-orange rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>24/7 support and maintenance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};
export default Connect;