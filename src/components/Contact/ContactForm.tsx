
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, Building, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { LiquidGlassCard } from '@/components/LiquidGlass/LiquidGlassCard';
import { LiquidGlassButton } from '@/components/LiquidGlass/LiquidGlassButton';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

const services = [
  'Architectural Rendering',
  'Architectural Walkthrough',
  '3D Rendering & Visualization',
  'VR Property Tours',
  'Drone Videography',
  'Real Estate Digital Campaigns',
  'Brand Identity Design',
  'UI/UX Design',
  'Web Applications',
  'Corporate Solutions',
  'Targeted Ads',
  'Broker Outreach',
  'Other'
];

export const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in your name, email, and message.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-form', {
        body: formData
      });

      if (error) {
        throw error;
      }

      if (data.success) {
        setIsSubmitted(true);
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for contacting us. We'll get back to you within 24 hours.",
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        });
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error: any) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Failed to Send Message",
        description: error.message || "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <LiquidGlassCard className="max-w-md mx-auto text-center p-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-xl font-semibold text-white">Message Sent!</h3>
          <p className="text-gray-300 text-center">
            Thank you for reaching out. We've received your message and will get back to you within 24 hours.
          </p>
          <LiquidGlassButton 
            onClick={() => setIsSubmitted(false)}
            className="mt-4"
          >
            Send Another Message
          </LiquidGlassButton>
        </div>
      </LiquidGlassCard>
    );
  }

  return (
    <LiquidGlassCard className="max-w-2xl mx-auto">
      <div className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Get In Touch</h2>
          <p className="text-gray-300">
            Ready to transform your vision into reality? Let's discuss your project.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="text-white">
                Name <span className="text-red-400">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-white">
                Email <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone" className="text-white">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="company" className="text-white">Company</Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  placeholder="Your company name"
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="service" className="text-white">Service Interested In</Label>
            <Select onValueChange={(value) => handleInputChange('service', value)}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                {services.map((service) => (
                  <SelectItem key={service} value={service} className="text-white hover:bg-gray-800">
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="message" className="text-white">
              Message <span className="text-red-400">*</span>
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 min-h-[120px]"
              placeholder="Tell us about your project, goals, and how we can help..."
              required
            />
          </div>

          <LiquidGlassButton
            type="submit"
            disabled={isSubmitting}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending Message...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </LiquidGlassButton>

          <p className="text-gray-400 text-sm text-center">
            By submitting this form, you agree to our privacy policy and terms of service.
          </p>
        </form>
      </div>
    </LiquidGlassCard>
  );
};
