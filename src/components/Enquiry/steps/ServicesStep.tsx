
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Plus, Minus, Check } from 'lucide-react';
import { LiquidGlassCard } from '@/components/LiquidGlass/LiquidGlassCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StepProps } from '../types';
import { cn } from '@/lib/utils';

// Updated service structure as requested
const servicesData = {
  'corporate-solutions': {
    name: 'CORPORATE SOLUTIONS',
    icon: '🏢',
    services: [
      { id: 'brand-identity', name: 'Brand Identity Design', minQuantity: 1, basePrice: 2500 },
      { id: 'ui-ux-design', name: 'UI/UX Design', minQuantity: 1, basePrice: 3000 },
      { id: 'web-apps', name: 'Web & Apps', minQuantity: 1, basePrice: 5000 }
    ]
  },
  '3d-rendering': {
    name: '3D RENDERING & VISUALIZATION',
    icon: '🎨',
    services: [
      { id: 'architectural-3d', name: 'Architectural 3D Rendering', minQuantity: 1, basePrice: 800 },
      { id: 'walkthrough-videos', name: 'Walkthrough Videos - Min: 3 minutes', minQuantity: 3, basePrice: 500, unit: 'minute' },
      { id: 'vr-property-tours', name: 'VR-Ready Property Tours', minQuantity: 1, basePrice: 1200 }
    ]
  },
  'digital-campaigns': {
    name: 'REAL ESTATE DIGITAL CAMPAIGNS',
    icon: '📱',
    services: [
      { id: 'facebook-google-ads', name: 'Facebook/Google Ads', minQuantity: 1, basePrice: 1500 },
      { id: 'drone-videography', name: 'Drone Videography', minQuantity: 1, basePrice: 800 },
      { id: 'broker-outreach', name: 'Broker/Investor Outreach', minQuantity: 1, basePrice: 1000 }
    ]
  }
};

export const ServicesStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrev
}) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(selectedServices).length > 0) {
      onNext();
    }
  };

  const getServiceById = (serviceId: string) => {
    for (const category of Object.values(servicesData)) {
      const service = category.services.find(s => s.id === serviceId);
      if (service) return service;
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 md:p-8 h-full"
    >
      <div className="max-w-6xl mx-auto h-full flex flex-col">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Select Your Services
          </h2>
          <p className="text-gray-300">
            Choose from our comprehensive range of creative and digital services
          </p>
        </div>

        <ScrollArea className="flex-1 pr-4">
          <form onSubmit={handleSubmit} className="space-y-8">
            {Object.entries(servicesData).map(([categoryKey, category]) => (
              <div key={categoryKey} className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="text-xl font-bold text-[#EEA849] tracking-wide">
                    {category.name}
                  </h3>
                </div>
                
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                  {category.services.map((service) => {
                    const quantity = selectedServices[service.id] || 0;
                    const isSelected = quantity > 0;
                    
                    return (
                      <motion.div
                        key={service.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="cursor-pointer"
                        onClick={() => handleServiceChange(service.id, isSelected ? 0 : service.minQuantity)}
                      >
                        <LiquidGlassCard 
                          className={cn(
                            "p-6 transition-all duration-300 border-2 h-full",
                            isSelected 
                              ? "border-[#FF6B35] bg-gradient-to-br from-[#FF6B35]/10 to-[#EEA849]/5 shadow-lg shadow-[#FF6B35]/20" 
                              : "border-gray-700 hover:border-gray-600 hover:bg-white/5"
                          )}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h4 className="font-semibold text-white mb-3 text-lg leading-tight">
                                {service.name}
                              </h4>
                              <div className="flex items-center gap-2 text-[#EEA849] mb-2">
                                <span className="font-bold text-xl">
                                  ${service.basePrice.toLocaleString()}
                                </span>
                                {service.unit && (
                                  <span className="text-sm opacity-80">/{service.unit}</span>
                                )}
                              </div>
                              {service.minQuantity > 1 && (
                                <p className="text-xs text-gray-400">
                                  Minimum: {service.minQuantity} {service.unit || 'unit(s)'}
                                </p>
                              )}
                            </div>
                            
                            <div className={cn(
                              "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0",
                              isSelected 
                                ? "border-[#FF6B35] bg-[#FF6B35] text-white" 
                                : "border-gray-600"
                            )}>
                              {isSelected && <Check className="h-3 w-3" />}
                            </div>
                          </div>
                          
                          <AnimatePresence>
                            {isSelected && (
                              <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="border-t border-gray-700 pt-4"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <span className="text-gray-300 font-medium">Quantity:</span>
                                  <div className="flex items-center gap-3">
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleServiceChange(service.id, Math.max(0, quantity - 1));
                                      }}
                                      disabled={quantity <= 0}
                                      className="h-8 w-8 p-0 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white"
                                    >
                                      <Minus className="h-3 w-3" />
                                    </Button>
                                    
                                    <span className="min-w-[3rem] text-center text-white font-bold text-lg">
                                      {quantity}
                                    </span>
                                    
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleServiceChange(service.id, quantity + 1);
                                      }}
                                      className="h-8 w-8 p-0 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white"
                                    >
                                      <Plus className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                                
                                <div className="text-right">
                                  <span className="text-gray-400 text-sm">Subtotal: </span>
                                  <span className="text-[#EEA849] font-bold">
                                    ${(service.basePrice * quantity).toLocaleString()}
                                  </span>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </LiquidGlassCard>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </form>
        </ScrollArea>

        {/* Summary */}
        {Object.keys(selectedServices).length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-[#FF6B35]/10 to-[#EEA849]/10 rounded-lg p-4 mb-6 mt-6"
          >
            <div className="flex justify-between items-center">
              <span className="text-white font-medium">
                {Object.keys(selectedServices).length} service(s) selected
              </span>
              <span className="text-[#EEA849] font-bold text-lg">
                Total: ${Object.entries(selectedServices).reduce((total, [serviceId, quantity]) => {
                  const service = getServiceById(serviceId);
                  return total + (service ? service.basePrice * quantity : 0);
                }, 0).toLocaleString()}
              </span>
            </div>
          </motion.div>
        )}

        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <Button
            type="button"
            variant="outline"
            onClick={onPrev}
            className="flex items-center gap-2 border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <Button
            type="button"
            onClick={onNext}
            disabled={Object.keys(selectedServices).length === 0}
            className="flex items-center gap-2 bg-gradient-to-r from-[#FF6B35] to-[#EEA849] hover:from-[#FF6B35]/90 hover:to-[#EEA849]/90 text-white font-medium"
          >
            Continue
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
