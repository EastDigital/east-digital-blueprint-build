
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ParentService, SubService } from '../types';

export const useServices = () => {
  const [parentServices, setParentServices] = useState<ParentService[]>([]);
  const [subServices, setSubServices] = useState<SubService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        
        // Fetch parent services
        const { data: parentData, error: parentError } = await supabase
          .from('parent_services')
          .select('*')
          .eq('is_active', true)
          .order('display_order');

        if (parentError) throw parentError;

        // Fetch sub services
        const { data: subData, error: subError } = await supabase
          .from('sub_services')
          .select('*')
          .eq('is_active', true)
          .order('display_order');

        if (subError) throw subError;

        setParentServices(parentData || []);
        setSubServices(subData || []);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return {
    parentServices,
    subServices,
    loading,
    error
  };
};
