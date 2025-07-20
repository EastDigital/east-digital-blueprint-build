import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Plus, Minus, Star } from 'lucide-react';
import { LiquidGlassCard } from '@/components/LiquidGlass/LiquidGlassCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StepProps } from '../types';
import { useServices } from '../hooks/useServices';
import { cn } from '@/lib/utils';

export const ServicesStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrev
}) => {
  const { parentServices, subServices, loading } = useServices();
  const [selectedServices, setSelectedServices] = useState<Record<string, number>>(
    formData.selectedServices || {}
  );

  useEffect(() => {
    updateFormData({ selectedServices });
  }, [selectedServices, updateFormData]);

  const handleServiceChange = (serviceId: string, quantity: number) => {
    setSelectedServices(prev => {
      const updated = { ...prev };
      if (quantity <= 0) {
        delete updated[serviceId];
      } else {
        updated[serviceId] = quantity;
      }
      return updated;
    });
  };

  const getServiceMinQuantity = (serviceId: string) => {
    const service = subServices.find(s => s.id === serviceId);
    return service ? service.minimum_quantity : 1;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(selectedServices).length > 0) {
      onNext();
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-eastdigital-orange border-t-transparent" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 h-full"
    >
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Select Your Services
          </h2>
          <p className="text-gray-300">
            Choose the services that best fit your project needs
          </p>
        </div>

        <ScrollArea className="flex-1 pr-4">
          <form onSubmit={handleSubmit} className="space-y-8">
            {parentServices.map((parent) => (
              <div key={parent.id} className="space-y-4">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Star className="h-5 w-5 text-eastdigital-orange" />
                  {parent.name}
                </h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subServices
                    .filter(sub => sub.parent_service_id === parent.id)
                    .map((service) => {
                      const quantity = selectedServices[service.id] || 0;
                      const minQuantity = getServiceMinQuantity(service.id);
                      const isSelected = quantity > 0;
                      
                      return (
                        <div
                          key={service.id}
                          className="cursor-pointer"
                          onClick={() => {
                            if (!isSelected) {
                              handleServiceChange(service.id, minQuantity);
                            }
                          }}
                        >
                          <LiquidGlassCard
                            className={cn(
                              "p-6 transition-all duration-300",
                              isSelected
                                ? "ring-2 ring-eastdigital-orange bg-eastdigital-orange/10"
                                : "hover:bg-white/5"
                            )}
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex-1">
                                <h4 className="font-semibold text-white mb-2">
                                  {service.name}
                                </h4>
                                {service.description && (
                                  <p className="text-gray-400 text-sm mb-3">
                                    {service.description}
                                  </p>
                                )}
                                {service.minimum_quantity > 1 && (
                                  <p className="text-gray-400 text-xs mt-1">
                                    Min: {service.minimum_quantity}
                                  </p>
                                )}
                              </div>
                            </div>

                            <AnimatePresence>
                              {isSelected && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="flex items-center justify-between pt-4 border-t border-white/10"
                                >
                                  <div className="flex items-center gap-3">
                                    <Button
                                      type="button"
                                      size="sm"
                                      variant="outline"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleServiceChange(service.id, Math.max(0, quantity - 1));
                                      }}
                                      className="h-8 w-8 p-0"
                                    >
                                      <Minus className="h-4 w-4" />
                                    </Button>
                                    
                                    <span className="font-medium text-white min-w-[2rem] text-center">
                                      {quantity}
                                    </span>
                                    
                                    <Button
                                      type="button"
                                      size="sm"
                                      variant="outline"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleServiceChange(service.id, quantity + 1);
                                      }}
                                      className="h-8 w-8 p-0"
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  
                                  <div className="text-right">
                                    <p className="text-eastdigital-orange font-bold">
                                      Selected
                                    </p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </LiquidGlassCard>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </form>
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

          <div className="text-center">
            <p className="text-gray-400 text-sm">
              {Object.keys(selectedServices).length} service(s) selected
            </p>
          </div>

          <Button
            type="button"
            onClick={onNext}
            disabled={Object.keys(selectedServices).length === 0}
            className="flex items-center gap-2 bg-eastdigital-orange hover:bg-eastdigital-orange/90"
          >
            Continue
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
