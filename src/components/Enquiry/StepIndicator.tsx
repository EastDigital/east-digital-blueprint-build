import React from 'react';
import { motion } from 'framer-motion';
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
    <div className={cn("flex items-center justify-center", className)}>
      <div className="flex items-center space-x-2 md:space-x-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex items-center gap-2 md:gap-3">
              <motion.div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300",
                  index <= currentStep ? "bg-eastdigital-orange text-white" : "bg-gray-800 text-gray-400"
                )}
                animate={{ scale: index === currentStep ? 1.1 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <span className="font-bold">{index + 1}</span>
              </motion.div>
              <span className={cn(
                "hidden md:inline text-sm",
                index <= currentStep ? "text-white" : "text-gray-500"
              )}>
                {step.title}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div className="w-8 md:w-16 h-0.5 bg-gray-800 relative">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-eastdigital-orange"
                  initial={{ width: 0 }}
                  animate={{ width: index < currentStep ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
