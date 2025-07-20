
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
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      <div className="flex items-center justify-between relative px-4">
        {/* Progress bar background */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-800 z-0" />
        {/* Active progress bar */}
        <motion.div
          className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-[#FF6B35] to-[#EEA849] z-10"
          initial={{ width: "0%" }}
          animate={{ 
            width: `${(currentStep / (steps.length - 2)) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        
        {steps.slice(0, -1).map((step, index) => (
          <div key={step.id} className="flex flex-col items-center space-y-3 relative z-20">
            <motion.div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center relative border-2 transition-all duration-300",
                index < currentStep
                  ? "bg-gradient-to-r from-[#FF6B35] to-[#EEA849] border-transparent text-white shadow-lg"
                  : index === currentStep
                  ? "bg-black border-[#FF6B35] text-[#FF6B35] shadow-lg shadow-[#FF6B35]/25"
                  : "bg-gray-900 border-gray-700 text-gray-500"
              )}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1,
                opacity: 1,
                transition: { 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30,
                  delay: index * 0.1
                }
              }}
            >
              {index < currentStep ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Check className="h-5 w-5" />
                </motion.div>
              ) : index === currentStep ? (
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className="text-lg">{step.icon}</span>
                </motion.div>
              ) : (
                <span className="text-lg opacity-50">{step.icon}</span>
              )}
              
              {index === currentStep && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[#FF6B35]"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.8, 0.2, 0.8]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.div>
            
            <div className="text-center min-w-[100px]">
              <motion.p
                className={cn(
                  "text-sm font-medium transition-colors duration-300",
                  index < currentStep ? "text-[#EEA849]" :
                  index === currentStep ? "text-white" : "text-gray-500"
                )}
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: index * 0.1 + 0.2 }
                }}
              >
                {step.title}
              </motion.p>
              {index === currentStep && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-gray-400 mt-1"
                >
                  Step {index + 1} of {steps.length - 1}
                </motion.div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
