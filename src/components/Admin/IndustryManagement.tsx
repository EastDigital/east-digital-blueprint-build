import React, { useState } from 'react';
import { Building2, Plus, Edit, Trash2, Search, Copy, GripVertical, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIndustryManagement, Industry } from '@/hooks/useIndustryManagement';
const ICON_OPTIONS = ['Building2', 'HardHat', 'Ruler', 'Briefcase', 'Factory', 'Home', 'Wrench', 'Laptop'];
const COLOR_OPTIONS = [{
  value: 'blue',
  label: 'Blue',
  class: 'bg-blue-500'
}, {
  value: 'orange',
  label: 'Orange',
  class: 'bg-orange-500'
}, {
  value: 'purple',
  label: 'Purple',
  class: 'bg-purple-500'
}, {
  value: 'emerald',
  label: 'Emerald',
  class: 'bg-emerald-500'
}, {
  value: 'red',
  label: 'Red',
  class: 'bg-red-500'
}, {
  value: 'yellow',
  label: 'Yellow',
  class: 'bg-yellow-500'
}, {
  value: 'green',
  label: 'Green',
  class: 'bg-green-500'
}, {
  value: 'pink',
  label: 'Pink',
  class: 'bg-pink-500'
}];

// Custom Toggle Switch Component with better styling
const CustomToggle = ({
  checked,
  onCheckedChange,
  id,
  label
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id: string;
  label: string;
}) => <div className="flex items-center space-x-3" onClick={e => e.stopPropagation()}>
    <button type="button" onClick={() => onCheckedChange(!checked)} className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ease-in-out
        ${checked ? 'bg-gradient-to-r from-eastdigital-orange to-orange-500 shadow-lg shadow-orange-500/30' : 'bg-gray-600 shadow-inner'}
        hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-eastdigital-orange focus:ring-offset-2 focus:ring-offset-gray-900
      `}>
      <span className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300 ease-in-out shadow-md
          ${checked ? 'translate-x-6 shadow-lg' : 'translate-x-1'}
        `} />
    </button>
    <Label htmlFor={id} className="text-white cursor-pointer select-none">
      {label}
    </Label>
  </div>;
export const IndustryManagement = () => {
  const {
    industries,
    loading,
    searchTerm,
    setSearchTerm,
    addIndustry,
    updateIndustry,
    deleteIndustry,
    duplicateIndustry
  } = useIndustryManagement();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingIndustry, setEditingIndustry] = useState<Industry | null>(null);
  const [newIndustry, setNewIndustry] = useState({
    title: '',
    subtitle: '',
    description: '',
    icon_name: 'Building2',
    projects_count: '0+',
    metric: '',
    metric_label: '',
    images: [] as string[],
    color: 'blue',
    display_order: 0,
    is_active: true,
    custom_icon_url: '',
    custom_color: '',
    show_projects_count: true,
    show_metric: true,
    show_metric_label: true,
    projects_count_label: 'Projects',
    metric_display_label: 'Metric',
    metric_label_display_label: 'Label'
  });
  const handleAddIndustry = async () => {
    try {
      const maxOrder = Math.max(...industries.map(i => i.display_order), 0);
      await addIndustry({
        ...newIndustry,
        display_order: maxOrder + 1
      });
      setNewIndustry({
        title: '',
        subtitle: '',
        description: '',
        icon_name: 'Building2',
        projects_count: '0+',
        metric: '',
        metric_label: '',
        images: [],
        color: 'blue',
        display_order: 0,
        is_active: true,
        custom_icon_url: '',
        custom_color: '',
        show_projects_count: true,
        show_metric: true,
        show_metric_label: true,
        projects_count_label: 'Projects',
        metric_display_label: 'Metric',
        metric_label_display_label: 'Label'
      });
      setIsAddDialogOpen(false);
    } catch (error) {
      // Error is handled in the hook
    }
  };
  const handleEditIndustry = async () => {
    if (!editingIndustry) return;
    try {
      await updateIndustry(editingIndustry.id, editingIndustry);
      setIsEditDialogOpen(false);
      setEditingIndustry(null);
    } catch (error) {
      // Error is handled in the hook
    }
  };
  const handleDuplicateIndustry = async (industry: Industry) => {
    try {
      await duplicateIndustry(industry);
    } catch (error) {
      // Error is handled in the hook
    }
  };
  const handleDeleteIndustry = async (id: string) => {
    try {
      await deleteIndustry(id);
    } catch (error) {
      // Error is handled in the hook
    }
  };
  const openEditDialog = (industry: Industry) => {
    setEditingIndustry({
      ...industry
    });
    setIsEditDialogOpen(true);
  };
  const IndustryForm = ({
    industry,
    onIndustryChange,
    onSubmit,
    submitLabel
  }: {
    industry: any;
    onIndustryChange: (updates: any) => void;
    onSubmit: () => void;
    submitLabel: string;
  }) => <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="basic">Basic Info</TabsTrigger>
        <TabsTrigger value="visual" className="text-gray-400">Visual & Metrics</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
      </TabsList>
      
      <div className="max-h-[60vh] overflow-y-auto mt-4">
        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-2 gap-4" onClick={e => e.stopPropagation()}>
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input id="title" value={industry.title} onChange={e => {
              e.stopPropagation();
              onIndustryChange({
                ...industry,
                title: e.target.value
              });
            }} onClick={e => e.stopPropagation()} className="bg-gray-800 border-gray-700 text-white" placeholder="Industry Title" />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input id="subtitle" value={industry.subtitle || ''} onChange={e => {
              e.stopPropagation();
              onIndustryChange({
                ...industry,
                subtitle: e.target.value
              });
            }} onClick={e => e.stopPropagation()} className="bg-gray-800 border-gray-700 text-white" placeholder="Industry Subtitle" />
            </div>
          </div>

          <div onClick={e => e.stopPropagation()}>
            <Label htmlFor="description">Description</Label>
            <textarea id="description" value={industry.description || ''} onChange={e => {
            e.stopPropagation();
            onIndustryChange({
              ...industry,
              description: e.target.value
            });
          }} onClick={e => e.stopPropagation()} className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white" rows={3} placeholder="Industry Description" />
          </div>

          <div onClick={e => e.stopPropagation()}>
            <CustomToggle checked={industry.is_active} onCheckedChange={checked => onIndustryChange({
            ...industry,
            is_active: checked
          })} id="is_active" label="Active" />
          </div>
        </TabsContent>

        <TabsContent value="visual" className="space-y-4">
          <div className="grid grid-cols-2 gap-4" onClick={e => e.stopPropagation()}>
            <div>
              <Label htmlFor="icon">Icon</Label>
              <select id="icon" value={industry.icon_name} onChange={e => {
              e.stopPropagation();
              onIndustryChange({
                ...industry,
                icon_name: e.target.value
              });
            }} onClick={e => e.stopPropagation()} className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white">
                {ICON_OPTIONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}
              </select>
            </div>
            <div>
              <Label htmlFor="custom_icon_url">Custom Icon URL</Label>
              <Input id="custom_icon_url" value={industry.custom_icon_url || ''} onChange={e => {
              e.stopPropagation();
              onIndustryChange({
                ...industry,
                custom_icon_url: e.target.value
              });
            }} onClick={e => e.stopPropagation()} className="bg-gray-800 border-gray-700 text-white" placeholder="https://example.com/icon.svg" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4" onClick={e => e.stopPropagation()}>
            <div>
              <Label htmlFor="color">Color</Label>
              <select id="color" value={industry.color} onChange={e => {
              e.stopPropagation();
              onIndustryChange({
                ...industry,
                color: e.target.value
              });
            }} onClick={e => e.stopPropagation()} className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white">
                {COLOR_OPTIONS.map(color => <option key={color.value} value={color.value}>{color.label}</option>)}
              </select>
            </div>
            <div>
              <Label htmlFor="custom_color">Custom Color (Hex)</Label>
              <Input id="custom_color" value={industry.custom_color || ''} onChange={e => {
              e.stopPropagation();
              onIndustryChange({
                ...industry,
                custom_color: e.target.value
              });
            }} onClick={e => e.stopPropagation()} className="bg-gray-800 border-gray-700 text-white" placeholder="#ff6b35" />
            </div>
          </div>

          <div className="space-y-6" onClick={e => e.stopPropagation()}>
            <CustomToggle checked={industry.show_projects_count} onCheckedChange={checked => onIndustryChange({
            ...industry,
            show_projects_count: checked
          })} id="show_projects_count" label="Show Projects Count" />

            {industry.show_projects_count && <div className="grid grid-cols-2 gap-4 ml-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div>
                  <Label htmlFor="projects_count">Projects Count</Label>
                  <Input id="projects_count" value={industry.projects_count || ''} onChange={e => {
                e.stopPropagation();
                onIndustryChange({
                  ...industry,
                  projects_count: e.target.value
                });
              }} onClick={e => e.stopPropagation()} className="bg-gray-800 border-gray-700 text-white" placeholder="45+" />
                </div>
                <div>
                  <Label htmlFor="projects_count_label">Label</Label>
                  <Input id="projects_count_label" value={industry.projects_count_label || ''} onChange={e => {
                e.stopPropagation();
                onIndustryChange({
                  ...industry,
                  projects_count_label: e.target.value
                });
              }} onClick={e => e.stopPropagation()} className="bg-gray-800 border-gray-700 text-white" placeholder="Projects" />
                </div>
              </div>}

            <CustomToggle checked={industry.show_metric} onCheckedChange={checked => onIndustryChange({
            ...industry,
            show_metric: checked
          })} id="show_metric" label="Show Metric" />

            {industry.show_metric && <div className="grid grid-cols-2 gap-4 ml-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div>
                  <Label htmlFor="metric">Metric</Label>
                  <Input id="metric" value={industry.metric || ''} onChange={e => {
                e.stopPropagation();
                onIndustryChange({
                  ...industry,
                  metric: e.target.value
                });
              }} onClick={e => e.stopPropagation()} className="bg-gray-800 border-gray-700 text-white" placeholder="285%" />
                </div>
                <div>
                  <Label htmlFor="metric_display_label">Display Label</Label>
                  <Input id="metric_display_label" value={industry.metric_display_label || ''} onChange={e => {
                e.stopPropagation();
                onIndustryChange({
                  ...industry,
                  metric_display_label: e.target.value
                });
              }} onClick={e => e.stopPropagation()} className="bg-gray-800 border-gray-700 text-white" placeholder="Metric" />
                </div>
              </div>}

            <CustomToggle checked={industry.show_metric_label} onCheckedChange={checked => onIndustryChange({
            ...industry,
            show_metric_label: checked
          })} id="show_metric_label" label="Show Metric Label" />

            {industry.show_metric_label && <div className="grid grid-cols-2 gap-4 ml-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div>
                  <Label htmlFor="metric_label">Metric Label</Label>
                  <Input id="metric_label" value={industry.metric_label || ''} onChange={e => {
                e.stopPropagation();
                onIndustryChange({
                  ...industry,
                  metric_label: e.target.value
                });
              }} onClick={e => e.stopPropagation()} className="bg-gray-800 border-gray-700 text-white" placeholder="Engagement Increase" />
                </div>
                <div>
                  <Label htmlFor="metric_label_display_label">Display Label</Label>
                  <Input id="metric_label_display_label" value={industry.metric_label_display_label || ''} onChange={e => {
                e.stopPropagation();
                onIndustryChange({
                  ...industry,
                  metric_label_display_label: e.target.value
                });
              }} onClick={e => e.stopPropagation()} className="bg-gray-800 border-gray-700 text-white" placeholder="Label" />
                </div>
              </div>}
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <div onClick={e => e.stopPropagation()}>
            <Label htmlFor="images">Images (URLs, one per line)</Label>
            <textarea id="images" value={industry.images?.join('\n') || ''} onChange={e => {
            e.stopPropagation();
            onIndustryChange({
              ...industry,
              images: e.target.value.split('\n').filter(url => url.trim() !== '')
            });
          }} onClick={e => e.stopPropagation()} className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white" rows={5} placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg" />
          </div>
        </TabsContent>
      </div>

      <Button onClick={onSubmit} className="w-full bg-eastdigital-orange hover:bg-eastdigital-orange/90 mt-4">
        {submitLabel}
      </Button>
    </Tabs>;
  if (loading) {
    return <div className="text-white">Loading industries...</div>;
  }
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Building2 className="h-6 w-6 text-eastdigital-orange" />
          <h2 className="text-2xl font-bold text-white">Industry Management</h2>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-eastdigital-orange hover:bg-eastdigital-orange/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Industry
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-4xl">
            <DialogHeader>
              <DialogTitle>Add New Industry</DialogTitle>
            </DialogHeader>
            <IndustryForm industry={newIndustry} onIndustryChange={setNewIndustry} onSubmit={handleAddIndustry} submitLabel="Add Industry" />
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Industry Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle>Edit Industry</DialogTitle>
          </DialogHeader>
          {editingIndustry && <IndustryForm industry={editingIndustry} onIndustryChange={setEditingIndustry} onSubmit={handleEditIndustry} submitLabel="Update Industry" />}
        </DialogContent>
      </Dialog>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-gray-400" />
        <Input placeholder="Search industries..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="bg-gray-800 border-gray-700 text-white" />
      </div>

      <div className="bg-gray-900 rounded-lg border border-gray-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-300">Order</TableHead>
              <TableHead className="text-gray-300">Title</TableHead>
              <TableHead className="text-gray-300">Icon</TableHead>
              <TableHead className="text-gray-300">Color</TableHead>
              <TableHead className="text-gray-300">Display Options</TableHead>
              <TableHead className="text-gray-300">Status</TableHead>
              <TableHead className="text-gray-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {industries.map(industry => <TableRow key={industry.id}>
                <TableCell className="text-white">
                  <div className="flex items-center">
                    <GripVertical className="h-4 w-4 text-gray-400 mr-2" />
                    {industry.display_order}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="text-white font-medium">{industry.title}</div>
                    {industry.subtitle && <div className="text-gray-400 text-sm">{industry.subtitle}</div>}
                  </div>
                </TableCell>
                <TableCell className="text-gray-300">
                  {industry.custom_icon_url ? <div className="flex items-center space-x-2">
                      <span className="text-xs text-blue-400">Custom</span>
                    </div> : industry.icon_name}
                </TableCell>
                <TableCell>
                  <Badge className={`${industry.custom_color ? 'text-white' : COLOR_OPTIONS.find(c => c.value === industry.color)?.class} text-white`} style={industry.custom_color ? {
                backgroundColor: industry.custom_color
              } : {}}>
                    {industry.custom_color || industry.color}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    {industry.show_projects_count && <span title="Projects Count Visible">
                        <Eye className="h-3 w-3 text-green-400" />
                      </span>}
                    {industry.show_metric && <span title="Metric Visible">
                        <Eye className="h-3 w-3 text-blue-400" />
                      </span>}
                    {industry.show_metric_label && <span title="Metric Label Visible">
                        <Eye className="h-3 w-3 text-purple-400" />
                      </span>}
                    {!industry.show_projects_count && !industry.show_metric && !industry.show_metric_label && <span title="All Hidden">
                        <EyeOff className="h-3 w-3 text-gray-400" />
                      </span>}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={industry.is_active ? 'default' : 'secondary'}>
                    {industry.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(industry)} className="border-gray-700 text-gray-300">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDuplicateIndustry(industry)} className="border-blue-700 text-blue-400 hover:bg-blue-900">
                      <Copy className="h-3 w-3" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="border-red-700 text-red-400 hover:bg-red-900">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-gray-900 border-gray-800 text-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-300">
                            This action cannot be undone. This will permanently delete the industry "{industry.title}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteIndustry(industry.id)} className="bg-red-600 hover:bg-red-700">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>)}
          </TableBody>
        </Table>
      </div>
    </div>;
};