import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: string;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  className
}) => {
  return (
    <div className={cn("flex items-center justify-between w-full", className)}>
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center text-center">
            <motion.div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                index < currentStep 
                  ? "bg-eastdigital-orange border-eastdigital-orange" 
                  : index === currentStep
                  ? "border-eastdigital-orange scale-110"
                  : "border-gray-700"
              )}
              animate={{ scale: index === currentStep ? 1.1 : 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5 text-white" />
              ) : (
                <div className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === currentStep ? "bg-eastdigital-orange" : "bg-gray-700"
                )}></div>
              )}
            </motion.div>
            <p className={cn(
              "text-xs mt-2 transition-colors duration-300",
              index <= currentStep ? "text-white" : "text-gray-500"
            )}>
              {step.title}
            </p>
          </div>

          {index < steps.length - 1 && (
            <div className="flex-1 h-0.5 bg-gray-800 mx-2 relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-eastdigital-orange"
                initial={{ width: 0 }}
                animate={{ width: index < currentStep ? '100%' : '0%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
