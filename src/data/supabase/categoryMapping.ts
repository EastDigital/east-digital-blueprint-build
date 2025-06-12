
// Category mapping from database values to display labels
export const categoryDisplayMap: { [key: string]: string } = {
  '3d-rendering': '3D Rendering & Visualization',
  'digital-marketing': 'Digital Marketing Campaigns',
  'corporate-solutions': 'Corporate Solutions'
};

// Reverse mapping for database queries
export const categoryDbMap: { [key: string]: string } = {
  '3D Rendering & Visualization': '3d-rendering',
  'Digital Marketing Campaigns': 'digital-marketing',
  'Corporate Solutions': 'corporate-solutions'
};
