import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Star, Clock, Mail } from 'lucide-react';
import { LiquidGlassCard } from '@/components/LiquidGlass/LiquidGlassCard';
import { EnquiryFormData } from '../types';

interface SuccessStepProps {
  formData: EnquiryFormData;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({ formData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto p-8 text-center"
    >
      <LiquidGlassCard className="p-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="h-10 w-10 text-green-400" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-white mb-4"
        >
          Enquiry Submitted Successfully!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-300 text-lg mb-8"
        >
          Thank you {formData.name}! We've received your project enquiry and will get back to you soon.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid gap-4 mb-8"
        >
          <div className="flex items-center gap-3 text-gray-300">
            <Mail className="h-5 w-5 text-eastdigital-orange" />
            <span>Confirmation email sent to {formData.email}</span>
          </div>
          
          <div className="flex items-center gap-3 text-gray-300">
            <Clock className="h-5 w-5 text-eastdigital-orange" />
            <span>We'll respond within 24-48 hours</span>
          </div>
          
          <div className="flex items-center gap-3 text-gray-300">
            <Star className="h-5 w-5 text-eastdigital-orange" />
            <span>Your project timeline: {formData.completionDays} days</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <Button
            onClick={() => window.location.href = '/'}
            className="w-full bg-eastdigital-orange hover:bg-eastdigital-orange/90 flex items-center gap-2"
          >
            Return to Homepage
            <ArrowRight className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            onClick={() => window.location.href = '/impact'}
            className="w-full"
          >
            View Our Portfolio
          </Button>
        </motion.div>
      </LiquidGlassCard>
    </motion.div>
  );
};
