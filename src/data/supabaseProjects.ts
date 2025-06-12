
import { 
  getSupabaseProjects, 
  getCarouselProjects, 
  getProjectByIdQuery, 
  getProjectBySlugQuery, 
  getProjectsByCategoryQuery 
} from './supabase/projectQueries';
import { mapProjectForPortfolio, mapProjectForDetails } from './supabase/projectMappers';
import { categoryDbMap } from './supabase/categoryMapping';

// Re-export types for backward compatibility
export type { SupabaseProject, ProjectDetailsType } from './supabase/types';

// Get ALL projects for Impact page (formatted for PortfolioSection component)
export const getAllProjects = async () => {
  console.log('Fetching all projects...');
  const data = await getSupabaseProjects();
  
  console.log(`Fetched ${data?.length || 0} projects from database`);
  console.log('Raw project data:', data);

  return data?.map(project => {
    const mappedProject = mapProjectForPortfolio(project);
    console.log('Mapped project:', mappedProject);
    return mappedProject;
  }) || [];
};

// Get projects by category for Impact page
export const getProjectsByCategory = async (category: string) => {
  let dbCategory: string | undefined;
  
  if (category !== 'All Projects') {
    dbCategory = categoryDbMap[category] || category;
  }

  const data = await getProjectsByCategoryQuery(dbCategory);
  return data?.map(mapProjectForPortfolio) || [];
};

// Get project by ID for project details page
export const getProjectById = async (id: string) => {
  const data = await getProjectByIdQuery(id);
  if (!data) return null;
  
  return mapProjectForDetails(data);
};

// Get project by slug for SEO-friendly URLs
export const getProjectBySlug = async (slug: string) => {
  const data = await getProjectBySlugQuery(slug);
  if (!data) return null;
  
  return mapProjectForDetails(data);
};

// Export carousel projects function (no changes needed)
export { getCarouselProjects };
