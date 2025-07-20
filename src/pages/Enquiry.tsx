import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { EnquiryForm } from '@/components/Enquiry/EnquiryForm';

const Enquiry = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative bg-black pt-20 pb-8 overflow-hidden">
          {/* Background texture */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/5 via-transparent to-[#EEA849]/5"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                Let's Build Something{' '}
                <span className="bg-gradient-to-r from-[#FF6B35] to-[#EEA849] bg-clip-text text-transparent">
                  Amazing
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                Transform your vision into reality with our expert team. Get a detailed proposal tailored to your project needs.
              </p>
              <div className="flex items-center justify-center gap-2 text-[#EEA849]">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Free consultation & proposal</span>
              </div>
            </div>
          </div>
        </section>

        <EnquiryForm />
      </main>
      <Footer />
    </div>
  );
};

export default Enquiry;