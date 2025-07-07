
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Check, Star, Clock, FileText, Zap, Sparkles } from 'lucide-react';
import { LiquidGlassCard } from '@/components/LiquidGlass/LiquidGlassCard';
import { StepProps } from '../types';

export const ReviewStep: React.FC<StepProps> = ({
  formData,
  onPrev,
  onSubmit,
  onInstantProposal,
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
      className="p-8"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Review Your Enquiry
          </h2>
          <p className="text-gray-300">
            Please review your information before submitting
          </p>
        </div>

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
              <Star className="h-5 w-5 text-eastdigital-orange" />
              Selected Services
            </h3>
            <div className="space-y-2">
              {formData.selectedServices && Object.entries(formData.selectedServices).map(([serviceId, quantity]) => (
                <div key={serviceId} className="flex justify-between items-center text-gray-300">
                  <span>Service {serviceId.slice(-4)}</span>
                  <span>Quantity: {quantity}</span>
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
                  <div key={index} className="text-gray-300">
                    <p>{file}</p>
                  </div>
                ))}
              </div>
            </LiquidGlassCard>
          )}

          {/* Action Buttons */}
          <div className="grid md:grid-cols-2 gap-4">
            <LiquidGlassCard className="p-6 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Standard Enquiry
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Get a detailed proposal within 24-48 hours
                  </p>
                  <Button
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Enquiry'
                    )}
                  </Button>
                </div>
              </div>
            </LiquidGlassCard>

            <LiquidGlassCard className="p-6 text-center border border-eastdigital-orange/20 bg-eastdigital-orange/5">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 bg-eastdigital-orange/20 rounded-full flex items-center justify-center">
                  <Zap className="h-6 w-6 text-eastdigital-orange" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    Instant Proposal
                    <Sparkles className="h-4 w-4 text-eastdigital-orange" />
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">
                    Get an AI-generated PDF proposal instantly
                  </p>
                  <p className="text-eastdigital-orange font-bold text-lg mb-4">
                    $29.99
                  </p>
                  <Button
                    onClick={onInstantProposal}
                    disabled={isSubmitting}
                    className="w-full bg-eastdigital-orange hover:bg-eastdigital-orange/90"
                  >
                    Get Instant Proposal
                  </Button>
                </div>
              </div>
            </LiquidGlassCard>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onPrev}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="text-gray-400 text-sm">
            Ready to submit your enquiry
          </div>
        </div>
      </div>
    </motion.div>
  );
};
