
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Clock, Calendar, Zap } from 'lucide-react';
import { LiquidGlassCard } from '@/components/LiquidGlass/LiquidGlassCard';
import { StepProps } from '../types';
import { cn } from '@/lib/utils';

const timelineOptions = [
  { value: 7, label: '1 Week', subtitle: 'Rush delivery', icon: '🚀' },
  { value: 14, label: '2 Weeks', subtitle: 'Fast delivery', icon: '⚡' },
  { value: 30, label: '1 Month', subtitle: 'Standard timeline', icon: '📅' },
  { value: 60, label: '2 Months', subtitle: 'Flexible timeline', icon: '🎯' },
  { value: 90, label: '3+ Months', subtitle: 'Long-term project', icon: '🏗️' },
];

export const TimelineStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrev
}) => {
  const handleTimelineSelect = (days: number) => {
    updateFormData({ completionDays: days });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.completionDays) {
      onNext();
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 h-full overflow-y-auto custom-scrollbar"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Project Timeline
          </h2>
          <p className="text-gray-300">
            When do you need your project completed?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            {timelineOptions.map((option) => (
              <div
                key={option.value}
                className="cursor-pointer"
                onClick={() => handleTimelineSelect(option.value)}
              >
                <LiquidGlassCard
                  className={cn(
                    "p-6 transition-all duration-300",
                    formData.completionDays === option.value
                      ? "ring-2 ring-eastdigital-orange bg-eastdigital-orange/10"
                      : "hover:bg-white/5"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{option.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {option.label}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {option.subtitle}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock className="h-4 w-4" />
                        <span>{option.value} days</span>
                      </div>
                    </div>
                  </div>
                </LiquidGlassCard>
              </div>
            ))}
          </div>

          {formData.completionDays && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-eastdigital-orange/10 rounded-lg p-6 border border-eastdigital-orange/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-eastdigital-orange" />
                  <span className="text-white font-semibold">Project Timeline</span>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-eastdigital-orange">
                    {formData.completionDays} days
                  </p>
                  <p className="text-gray-400 text-sm">
                    {timelineOptions.find(t => t.value === formData.completionDays)?.label}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex justify-between items-center pt-4">
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
              type="submit"
              disabled={!formData.completionDays}
              className="flex items-center gap-2 bg-eastdigital-orange hover:bg-eastdigital-orange/90"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
