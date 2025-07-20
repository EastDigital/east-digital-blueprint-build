import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ChevronRight, User, Mail, Phone, Globe, MessageSquare } from 'lucide-react';
import { StepProps } from '../types';

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France',
  'India', 'Japan', 'China', 'Brazil', 'Mexico', 'Spain', 'Italy', 'Netherlands',
  'Sweden', 'Norway', 'Denmark', 'Other'
];

export const ContactStep: React.FC<StepProps> = ({
  formData,
  errors,
  updateFormData,
  onNext
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 h-full overflow-y-auto custom-scrollbar"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Let's Get to Know You
          </h2>
          <p className="text-gray-300">
            Tell us a bit about yourself and your project
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData({ name: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="text-red-400 text-sm">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData({ email: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData({ phone: e.target.value })}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && (
                <p className="text-red-400 text-sm">{errors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="country" className="text-white flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Country *
              </Label>
              <select
                id="country"
                value={formData.country}
                onChange={(e) => updateFormData({ country: e.target.value })}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-eastdigital-orange"
              >
                <option value="">Select your country</option>
                {countries.map((country) => (
                  <option key={country} value={country} className="bg-gray-900">
                    {country}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="text-red-400 text-sm">{errors.country}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-white flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Project Description
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => updateFormData({ message: e.target.value })}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[120px]"
              placeholder="Tell us about your project, goals, or any specific requirements..."
            />
            <p className="text-gray-400 text-sm">
              Optional: Help us understand your vision better
            </p>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
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
