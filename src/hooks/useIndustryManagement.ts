
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Industry {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  icon_name: string;
  projects_count: string | null;
  metric: string | null;
  metric_label: string | null;
  images: string[] | null;
  color: string;
  display_order: number;
  is_active: boolean;
  custom_icon_url: string | null;
  custom_color: string | null;
  show_projects_count: boolean;
  show_metric: boolean;
  show_metric_label: boolean;
  projects_count_label: string | null;
  metric_display_label: string | null;
  metric_label_display_label: string | null;
}

export const useIndustryManagement = () => {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const fetchIndustries = async () => {
    try {
      const { data, error } = await supabase
        .from('industries')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setIndustries(data || []);
    } catch (error) {
      console.error('Error fetching industries:', error);
      toast({
        title: "Error",
        description: "Failed to fetch industries.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndustries();
  }, []);

  const filteredIndustries = industries.filter(industry =>
    industry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (industry.subtitle && industry.subtitle.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const addIndustry = async (industryData: Omit<Industry, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('industries')
        .insert([industryData])
        .select()
        .single();

      if (error) throw error;

      setIndustries(prev => [...prev, data]);
      toast({
        title: "Success",
        description: "Industry added successfully.",
      });
      
      return data;
    } catch (error) {
      console.error('Error adding industry:', error);
      toast({
        title: "Error",
        description: "Failed to add industry.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateIndustry = async (id: string, updates: Partial<Industry>) => {
    try {
      const { data, error } = await supabase
        .from('industries')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setIndustries(prev => prev.map(industry => 
        industry.id === id ? data : industry
      ));

      toast({
        title: "Success",
        description: "Industry updated successfully.",
      });

      return data;
    } catch (error) {
      console.error('Error updating industry:', error);
      toast({
        title: "Error",
        description: "Failed to update industry.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteIndustry = async (id: string) => {
    try {
      const { error } = await supabase
        .from('industries')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setIndustries(prev => prev.filter(industry => industry.id !== id));
      toast({
        title: "Success",
        description: "Industry deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting industry:', error);
      toast({
        title: "Error",
        description: "Failed to delete industry.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const duplicateIndustry = async (industry: Industry) => {
    const duplicateData = {
      ...industry,
      title: `${industry.title} (Copy)`,
      display_order: Math.max(...industries.map(i => i.display_order)) + 1,
    };
    delete (duplicateData as any).id;
    
    return addIndustry(duplicateData);
  };

  return {
    industries: filteredIndustries,
    loading,
    searchTerm,
    setSearchTerm,
    addIndustry,
    updateIndustry,
    deleteIndustry,
    duplicateIndustry,
    refetch: fetchIndustries,
  };
};
