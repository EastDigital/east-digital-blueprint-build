export interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
  country: string;
  message?: string;
  selectedServices?: Record<string, number>;
  completionDays?: number;
  uploadedFiles?: string[];
}

export interface EnquiryFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  country?: string;
  selectedServices?: string;
  completionDays?: string;
}

export interface StepProps {
  formData: EnquiryFormData;
  errors: EnquiryFormErrors;
  updateFormData: (data: Partial<EnquiryFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  onInstantProposal: () => void;
  isSubmitting: boolean;
}

export interface ParentService {
  id: string;
  name: string;
  slug: string;
  description?: string;
  is_active: boolean;
  display_order: number;
}

export interface SubService {
  id: string;
  parent_service_id: string;
  name: string;
  slug: string;
  description?: string;
  base_price: number;
  pricing_unit: string;
  minimum_quantity: number;
  is_active: boolean;
  display_order: number;
}
