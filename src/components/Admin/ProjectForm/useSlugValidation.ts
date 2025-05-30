
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useSlugValidation = (
  slug: string, 
  projectId?: string, 
  mode: 'create' | 'edit' = 'create'
) => {
  const [slugCheckState, setSlugCheckState] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  const [slugError, setSlugError] = useState<string>('');

  useEffect(() => {
    const checkSlugAvailability = async () => {
      if (!slug || slug.length < 3) {
        setSlugCheckState('idle');
        setSlugError('');
        return;
      }

      setSlugCheckState('checking');
      
      try {
        const { data: existingProject, error } = await supabase
          .from('projects')
          .select('id')
          .eq('slug', slug)
          .maybeSingle();

        if (error) {
          console.error('Error checking slug:', error);
          setSlugCheckState('idle');
          setSlugError('Error checking slug availability');
          return;
        }

        // If we found a project with this slug
        if (existingProject) {
          // If we're editing and it's the same project, it's okay
          if (mode === 'edit' && projectId && existingProject.id === projectId) {
            setSlugCheckState('available');
            setSlugError('');
          } else {
            setSlugCheckState('taken');
            setSlugError('This URL slug is already taken');
          }
        } else {
          setSlugCheckState('available');
          setSlugError('');
        }
      } catch (error) {
        console.error('Error checking slug:', error);
        setSlugCheckState('idle');
        setSlugError('Error checking slug availability');
      }
    };

    const timeoutId = setTimeout(checkSlugAvailability, 500);
    return () => clearTimeout(timeoutId);
  }, [slug, projectId, mode]);

  return { slugCheckState, slugError };
};
