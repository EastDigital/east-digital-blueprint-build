
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { EnquiryFormData, EnquiryFormErrors } from '../types';

export const useEnquiryForm = () => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: '',
    email: '',
    phone: '',
    country: '',
    message: '',
    selectedServices: {},
    completionDays: undefined,
    uploadedFiles: []
  });

  const [errors, setErrors] = useState<EnquiryFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const updateFormData = useCallback((data: Partial<EnquiryFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    // Clear related errors when updating data
    setErrors(prev => {
      const newErrors = { ...prev };
      Object.keys(data).forEach(key => {
        delete newErrors[key as keyof EnquiryFormErrors];
      });
      return newErrors;
    });
  }, []);

  const validateStep = useCallback((step: number): boolean => {
    const newErrors: EnquiryFormErrors = {};

    switch (step) {
      case 0: // Contact step
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (!formData.country.trim()) newErrors.country = 'Country is required';
        break;

      case 1: // Services step
        if (!formData.selectedServices || Object.keys(formData.selectedServices).length === 0) {
          newErrors.selectedServices = 'Please select at least one service';
        }
        break;

      case 2: // Timeline step
        if (!formData.completionDays) {
          newErrors.completionDays = 'Please select a timeline';
        }
        break;

      case 3: // Files step (optional)
        // No validation needed for files step
        break;

      case 4: // Review step
        // Final validation of all required fields
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (!formData.country.trim()) newErrors.country = 'Country is required';
        if (!formData.selectedServices || Object.keys(formData.selectedServices).length === 0) {
          newErrors.selectedServices = 'Please select at least one service';
        }
        if (!formData.completionDays) {
          newErrors.completionDays = 'Please select a timeline';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const submitEnquiry = useCallback(async (): Promise<boolean> => {
    if (!validateStep(4)) return false;

    setIsSubmitting(true);
    try {
      // Insert enquiry
      const { data: enquiry, error: enquiryError } = await supabase
        .from('enquiries')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          message: formData.message || null,
          completion_days: formData.completionDays!,
          uploaded_files: formData.uploadedFiles || [],
          status: 'pending'
        })
        .select()
        .single();

      if (enquiryError) throw enquiryError;

      // Insert selected services
      if (formData.selectedServices && enquiry) {
        const serviceInserts = Object.entries(formData.selectedServices).map(([serviceId, quantity]) => ({
          enquiry_id: enquiry.id,
          sub_service_id: serviceId,
          quantity
        }));

        const { error: servicesError } = await supabase
          .from('enquiry_services')
          .insert(serviceInserts);

        if (servicesError) throw servicesError;
      }

      setIsSubmitted(true);
      toast({
        title: "Enquiry Submitted Successfully!",
        description: "We'll get back to you within 24-48 hours.",
      });

      return true;
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your enquiry. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateStep, toast]);

  const requestInstantProposal = useCallback(async (): Promise<boolean> => {
    if (!validateStep(4)) return false;

    setIsSubmitting(true);
    try {
      // First submit the enquiry with instant proposal flag
      const { data: enquiry, error: enquiryError } = await supabase
        .from('enquiries')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          message: formData.message || null,
          completion_days: formData.completionDays!,
          uploaded_files: formData.uploadedFiles || [],
          instant_proposal_requested: true,
          status: 'pending'
        })
        .select()
        .single();

      if (enquiryError) throw enquiryError;

      // Insert selected services
      if (formData.selectedServices && enquiry) {
        const serviceInserts = Object.entries(formData.selectedServices).map(([serviceId, quantity]) => ({
          enquiry_id: enquiry.id,
          sub_service_id: serviceId,
          quantity
        }));

        const { error: servicesError } = await supabase
          .from('enquiry_services')
          .insert(serviceInserts);

        if (servicesError) throw servicesError;
      }

      // Here you would normally integrate with Stripe for payment
      // For now, we'll just show a success message
      toast({
        title: "Instant Proposal Requested!",
        description: "Please complete the payment to receive your instant proposal.",
      });

      return true;
    } catch (error) {
      console.error('Error requesting instant proposal:', error);
      toast({
        title: "Request Failed",
        description: "There was an error requesting your instant proposal. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateStep, toast]);

  return {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    updateFormData,
    validateStep,
    submitEnquiry,
    requestInstantProposal
  };
};
