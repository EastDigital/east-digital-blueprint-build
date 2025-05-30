
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface ProjectFormData {
  client: string;
  location: string;
  duration: string;
  team_size: string;
  challenge: string;
  solution: string;
  engagement_result: string;
  leads_result: string;
  conversion_result: string;
  timeline_result: string;
  tags: string[];
}

interface ProjectDetailsTabProps {
  data: ProjectFormData;
  onInputChange: (field: keyof ProjectFormData, value: any) => void;
  onTagsChange: (tagsString: string) => void;
}

export const ProjectDetailsTab = ({
  data,
  onInputChange,
  onTagsChange
}: ProjectDetailsTabProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="client" className="text-white">Client</Label>
          <Input
            id="client"
            value={data.client}
            onChange={(e) => onInputChange('client', e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            placeholder="Client name"
          />
        </div>
        <div>
          <Label htmlFor="location" className="text-white">Location</Label>
          <Input
            id="location"
            value={data.location}
            onChange={(e) => onInputChange('location', e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            placeholder="Project location"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="duration" className="text-white">Duration</Label>
          <Input
            id="duration"
            value={data.duration}
            onChange={(e) => onInputChange('duration', e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            placeholder="Project duration"
          />
        </div>
        <div>
          <Label htmlFor="team_size" className="text-white">Team Size</Label>
          <Input
            id="team_size"
            value={data.team_size}
            onChange={(e) => onInputChange('team_size', e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            placeholder="Team size"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="challenge" className="text-white">Challenge</Label>
        <Textarea
          id="challenge"
          value={data.challenge}
          onChange={(e) => onInputChange('challenge', e.target.value)}
          className="bg-gray-800 border-gray-700 text-white"
          placeholder="Project challenge description"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="solution" className="text-white">Solution</Label>
        <Textarea
          id="solution"
          value={data.solution}
          onChange={(e) => onInputChange('solution', e.target.value)}
          className="bg-gray-800 border-gray-700 text-white"
          placeholder="Solution description"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="engagement_result" className="text-white">Engagement Result</Label>
          <Input
            id="engagement_result"
            value={data.engagement_result}
            onChange={(e) => onInputChange('engagement_result', e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            placeholder="e.g., 150% increase"
          />
        </div>
        <div>
          <Label htmlFor="leads_result" className="text-white">Leads Result</Label>
          <Input
            id="leads_result"
            value={data.leads_result}
            onChange={(e) => onInputChange('leads_result', e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            placeholder="e.g., 300+ new leads"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="conversion_result" className="text-white">Conversion Result</Label>
          <Input
            id="conversion_result"
            value={data.conversion_result}
            onChange={(e) => onInputChange('conversion_result', e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            placeholder="e.g., 25% conversion rate"
          />
        </div>
        <div>
          <Label htmlFor="timeline_result" className="text-white">Timeline Result</Label>
          <Input
            id="timeline_result"
            value={data.timeline_result}
            onChange={(e) => onInputChange('timeline_result', e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            placeholder="e.g., Delivered 2 weeks early"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="tags" className="text-white">Tags (comma-separated)</Label>
        <Input
          id="tags"
          value={data.tags?.join(', ') || ''}
          onChange={(e) => onTagsChange(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white"
          placeholder="3D, marketing, luxury, residential"
        />
        {data.tags && data.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {data.tags.map((tag, idx) => (
              <Badge key={idx} variant="secondary" className="bg-eastdigital-orange/20 text-eastdigital-orange">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
