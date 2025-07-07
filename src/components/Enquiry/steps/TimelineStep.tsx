
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Clock, Calendar, Zap } from 'lucide-react';
import { LiquidGlassCard } from '@/components/LiquidGlass/LiquidGlassCard';
import { StepProps } from '../types';
import { cn } from '@/lib/utils';

const timelineOptions = [
  { value: 7, label: '1 Week', subtitle: 'Rush job - 50% surcharge', icon: '🚀', multiplier: 1.5 },
  { value: 14, label: '2 Weeks', subtitle: 'Fast delivery - 25% surcharge', icon: '⚡', multiplier: 1.25 },
  { value: 30, label: '1 Month', subtitle: 'Standard timeline', icon: '📅', multiplier: 1 },
  { value: 60, label: '2 Months', subtitle: 'Flexible timeline - 10% discount', icon: '🎯', multiplier: 0.9 },
  { value: 90, label: '3+ Months', subtitle: 'Long-term project - 20% discount', icon: '🏗️', multiplier: 0.8 },
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

  const getBaseTotal = () => {
    if (!formData.selectedServices) return 0;
    
    // This would normally come from your services calculation
    // For now, we'll calculate a rough estimate
    return Object.entries(formData.selectedServices).reduce((total, [serviceId, quantity]) => {
      // This is a simplified calculation - in reality you'd look up the actual service prices
      return total + (quantity * 100); // Placeholder calculation
    }, 0);
  };

  const getAdjustedTotal = () => {
    const baseTotal = getBaseTotal();
    const timeline = timelineOptions.find(t => t.value === formData.completionDays);
    return timeline ? baseTotal * timeline.multiplier : baseTotal;
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
            Project Timeline
          </h2>
          <p className="text-gray-300">
            When do you need your project completed?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            {timelineOptions.map((option) => (
              <LiquidGlassCard
                key={option.value}
                className={cn(
                  "p-6 cursor-pointer transition-all duration-300",
                  formData.completionDays === option.value
                    ? "ring-2 ring-eastdigital-orange bg-eastdigital-orange/10"
                    : "hover:bg-white/5"
                )}
                onClick={() => handleTimelineSelect(option.value)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{option.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {option.label}
                      </h3>
                      <p className={cn(
                        "text-sm",
                        option.multiplier > 1 ? "text-yellow-400" :
                        option.multiplier < 1 ? "text-green-400" : "text-gray-400"
                      )}>
                        {option.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    {option.multiplier !== 1 && (
                      <div className={cn(
                        "text-sm font-medium",
                        option.multiplier > 1 ? "text-yellow-400" : "text-green-400"
                      )}>
                        {option.multiplier > 1 ? '+' : ''}{((option.multiplier - 1) * 100).toFixed(0)}%
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>{option.value} days</span>
                    </div>
                  </div>
                </div>
              </LiquidGlassCard>
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
