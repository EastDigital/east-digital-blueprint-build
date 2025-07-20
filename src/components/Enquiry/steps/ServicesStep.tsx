import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Star } from 'lucide-react';
import { LiquidGlassCard } from '@/components/LiquidGlass/LiquidGlassCard';
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
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">
            Select Your Services
          </h2>
          <p className="text-gray-300">
            Choose the services that best fit your project needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {parentServices.map((parent) => (
            <div key={parent.id} className="space-y-4">
              <h3 className="text-xl font-semibold text-white flex items-center gap-3">
                <Star className="h-5 w-5 text-eastdigital-orange" />
                {parent.name}
              </h3>
              
              <div className="space-y-3">
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
                            "p-4 transition-all duration-300",
                            isSelected
                              ? "ring-2 ring-eastdigital-orange bg-eastdigital-orange/10"
                              : "hover:bg-white/5"
                          )}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-semibold text-white mb-1">
                                {service.name}
                              </h4>
                              {service.minimum_quantity > 1 && (
                                <p className="text-gray-400 text-xs">
                                  Min: {service.minimum_quantity} {service.pricing_unit === 'per_minute' ? 'minutes' : ''}
                                </p>
                              )}
                            </div>
                            
                            <AnimatePresence>
                              {isSelected ? (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.5 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.5 }}
                                  className="flex items-center gap-2"
                                >
                                  <Button type="button" size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleServiceChange(service.id, Math.max(0, quantity - 1)); }} className="h-7 w-7 p-0">
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <span className="font-medium text-white min-w-[2rem] text-center">{quantity}</span>
                                  <Button type="button" size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleServiceChange(service.id, quantity + 1); }} className="h-7 w-7 p-0">
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </motion.div>
                              ) : (
                                <Button type="button" size="sm" variant="outline" className="h-7 w-7 p-0">
                                  <Plus className="h-4 w-4" />
                                </Button>
                              )}
                            </AnimatePresence>
                          </div>
                        </LiquidGlassCard>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
