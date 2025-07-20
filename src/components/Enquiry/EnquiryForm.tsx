import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Check, Sparkles } from 'lucide-react';
import { LiquidGlassCard } from '@/components/LiquidGlass/LiquidGlassCard';
import { StepIndicator } from './StepIndicator';
import { ContactStep } from './steps/ContactStep';
import { ServicesStep } from './steps/ServicesStep';
import { TimelineStep } from './steps/TimelineStep';
import { FilesStep } from './steps/FilesStep';
import { ReviewStep } from './steps/ReviewStep';
import { SuccessStep } from './steps/SuccessStep';
import { useEnquiryForm } from './hooks/useEnquiryForm';

const steps = [
  { id: 'contact', title: 'Your Details', icon: '窓' },
  { id: 'services', title: 'Select Services', icon: '識' },
  { id: 'timeline', title: 'Timeline & Budget', icon: '竢ｰ' },
  { id: 'files', title: 'Project Files', icon: '刀' },
  { id: 'review', title: 'Review & Submit', icon: '笨ｨ' },
  { id: 'success', title: 'Complete', icon: '脂' }
];

export const EnquiryForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);
  
  const {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    updateFormData,
    validateStep,
    submitEnquiry,
    requestInstantProposal
  } = useEnquiryForm();

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setDirection(1);
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      const success = await submitEnquiry();
      if (success) {
        setDirection(1);
        setCurrentStep(steps.length); // Go to success step
      }
    }
  };

  const handleInstantProposal = async () => {
    const success = await requestInstantProposal();
    if (success) {
      console.log('Instant proposal requested');
      // Here you would typically redirect to a payment page
      // For now, we'll just show the success message.
      setDirection(1);
      setCurrentStep(steps.length);
    }
  };

  const renderStep = () => {
    const stepProps = {
      formData,
      errors,
      updateFormData,
      onNext: nextStep,
      onPrev: prevStep,
      onSubmit: handleSubmit,
      onInstantProposal: handleInstantProposal,
      isSubmitting
    };

    switch (currentStep) {
      case 0:
        return <ContactStep {...stepProps} />;
      case 1:
        return <ServicesStep {...stepProps} />;
      case 2:
        return <TimelineStep {...stepProps} />;
      case 3:
        return <FilesStep {...stepProps} />;
      case 4:
        return <ReviewStep {...stepProps} />;
      case 5:
        return <SuccessStep formData={formData} />;
      default:
        return <ContactStep {...stepProps} />;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <SuccessStep formData={formData} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8 px-4 enquiry-bg">
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Let's Build Something Amazing
          </motion.h1>
        </div>

        {/* Step Indicator */}
        <StepIndicator 
          steps={steps} 
          currentStep={currentStep} 
          className="mb-8"
        />

        {/* Form Content */}
        <div className="flex-1 flex flex-col min-h-[600px]">
          <LiquidGlassCard className="flex-1 overflow-hidden">
            <div className="relative h-full min-h-[600px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col"
                >
                  <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {renderStep()}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </LiquidGlassCard>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          {currentStep > 0 ? (
            <Button
              variant="outline"
              onClick={prevStep}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
          ) : (
            <div></div> /* Placeholder for spacing */
          )}

          {currentStep < steps.length - 1 ? (
            <Button
              onClick={nextStep}
              className="flex items-center gap-2 bg-eastdigital-orange hover:bg-eastdigital-orange/90 google-ai-button"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-eastdigital-orange hover:bg-eastdigital-orange/90 google-ai-button"
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
          )}
        </div>
      </div>
    </div>
  );
};
