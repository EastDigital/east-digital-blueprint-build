import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { EnquiryForm } from '@/components/Enquiry/EnquiryForm';

const Enquiry = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-1 pt-20">
        <EnquiryForm />
      </main>
      <Footer />
    </div>
  );
};

export default Enquiry;
