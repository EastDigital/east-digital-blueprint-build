import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Check, Clock, FileText, Sparkles } from 'lucide-react';
import { LiquidGlassCard } from '@/components/LiquidGlass/LiquidGlassCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StepProps } from '../types';

export const ReviewStep: React.FC<StepProps> = ({
  formData,
  onPrev,
  onSubmit,
  isSubmitting
}) => {
  const getTimelineLabel = () => {
    const days = formData.completionDays;
    if (days <= 7) return '1 Week';
    if (days <= 14) return '2 Weeks';
    if (days <= 30) return '1 Month';
    if (days <= 60) return '2 Months';
    return '3+ Months';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 h-full"
    >
      <div className="max-w-3xl mx-auto h-full flex flex-col">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Review Your Enquiry
          </h2>
          <p className="text-gray-300">
            Please review your information before submitting
          </p>
        </div>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6">
            {/* Contact Information */}
            <LiquidGlassCard className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Check className="h-5 w-5 text-eastdigital-orange" />
                Contact Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                <div>
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                </div>
                <div>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                  <p><strong>Country:</strong> {formData.country}</p>
                </div>
              </div>
              {formData.message && (
                <div className="mt-4">
                  <p className="text-gray-300">
                    <strong>Message:</strong> {formData.message}
                  </p>
                </div>
              )}
            </LiquidGlassCard>

            {/* Selected Services */}
            <LiquidGlassCard className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-eastdigital-orange" />
                Selected Services
              </h3>
              <div className="space-y-2">
                {formData.selectedServices && Object.entries(formData.selectedServices).map(([serviceId, quantity]) => (
                  <div key={serviceId} className="flex justify-between items-center text-gray-300 py-2 border-b border-white/10 last:border-b-0">
                    <span>Service Package</span>
                    <span className="text-eastdigital-orange font-medium">Qty: {quantity}</span>
                  </div>
                ))}
              </div>
            </LiquidGlassCard>

            {/* Timeline */}
            <LiquidGlassCard className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-eastdigital-orange" />
                Project Timeline
              </h3>
              <div className="text-gray-300">
                <p><strong>Completion Time:</strong> {getTimelineLabel()} ({formData.completionDays} days)</p>
              </div>
            </LiquidGlassCard>

            {/* Files */}
            {formData.uploadedFiles && formData.uploadedFiles.length > 0 && (
              <LiquidGlassCard className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-eastdigital-orange" />
                  Uploaded Files
                </h3>
                <div className="space-y-2">
                  {formData.uploadedFiles.map((file, index) => (
                    <div key={index} className="text-gray-300 py-1">
                      <p>{file}</p>
                    </div>
                  ))}
                </div>
              </LiquidGlassCard>
            )}
          </div>
        </ScrollArea>

        <div className="flex justify-between items-center pt-4 mt-4 border-t border-white/10">
          <Button
            type="button"
            variant="outline"
            onClick={onPrev}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <Button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-eastdigital-orange hover:bg-eastdigital-orange/90"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                Submitting...
              </>
            ) : (
              <>
                Submit Enquiry
                <Check className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
