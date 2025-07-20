import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: string;
  title: string;
  icon: string;
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
      <div className="flex items-center space-x-4 overflow-x-auto pb-2">
        {steps.slice(0, -1).map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center space-y-2 min-w-0">
              <motion.div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center relative",
                  "transition-all duration-300",
                  index < currentStep
                    ? "bg-eastdigital-orange text-white"
                    : index === currentStep
                    ? "bg-eastdigital-orange/20 text-eastdigital-orange ring-2 ring-eastdigital-orange"
                    : "bg-gray-800 text-gray-400"
                )}
                initial={{ scale: 0.8 }}
                animate={{ 
                  scale: index === currentStep ? 1.1 : 1,
                  transition: { type: "spring", stiffness: 300, damping: 30 }
                }}
              >
                {index < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-lg">{step.icon}</span>
                )}
                
                {index === currentStep && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-eastdigital-orange/20"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.2, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.div>
              
              <div className="text-center">
                <p className={cn(
                  "text-sm font-medium transition-colors",
                  index <= currentStep ? "text-white" : "text-gray-400"
                )}>
                  {step.title}
                </p>
              </div>
            </div>
            
            {index < steps.length - 2 && (
              <div className={cn(
                "h-px w-12 transition-colors duration-300",
                index < currentStep ? "bg-eastdigital-orange" : "bg-gray-700"
              )} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
