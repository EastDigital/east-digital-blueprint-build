
import React, { useState } from 'react';
import { Settings, Save, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export const SiteSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    siteName: 'EastDigital',
    tagline: 'Transforming Real Estate through Innovation',
    contactEmail: 'hello@eastdigital.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Ave, Suite 100, City, ST 12345',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/eastdigital',
      twitter: 'https://twitter.com/eastdigital',
      instagram: 'https://instagram.com/eastdigital'
    },
    seo: {
      metaTitle: 'EastDigital - Real Estate Innovation',
      metaDescription: 'Leading real estate technology solutions and digital transformation services.',
      keywords: 'real estate, technology, digital transformation, 3D visualization'
    },
    analytics: {
      googleAnalyticsId: '',
      facebookPixelId: ''
    }
  });

  const handleInputChange = (section: string, field: string, value: string) => {
    if (section === 'general') {
      setSettings({ ...settings, [field]: value });
    } else {
      setSettings({
        ...settings,
        [section]: {
          ...settings[section as keyof typeof settings] as any,
          [field]: value
        }
      });
    }
  };

  const handleSave = () => {
    // In a real application, this would save to a backend
    console.log('Saving settings:', settings);
    toast({
      title: "Settings Saved",
      description: "Your site settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Settings className="h-6 w-6 text-eastdigital-orange" />
          <h2 className="text-2xl font-bold text-white">Site Settings</h2>
        </div>
        <Button onClick={handleSave} className="bg-eastdigital-orange hover:bg-eastdigital-orange/90">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>

      <div className="grid gap-6">
        {/* General Settings */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">General Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="siteName" className="text-gray-300">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="tagline" className="text-gray-300">Tagline</Label>
              <Input
                id="tagline"
                value={settings.tagline}
                onChange={(e) => handleInputChange('general', 'tagline', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contactEmail" className="text-gray-300">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleInputChange('general', 'contactEmail', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
              <Input
                id="phone"
                value={settings.phone}
                onChange={(e) => handleInputChange('general', 'phone', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address" className="text-gray-300">Address</Label>
              <Input
                id="address"
                value={settings.address}
                onChange={(e) => handleInputChange('general', 'address', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">Social Media Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="linkedin" className="text-gray-300">LinkedIn</Label>
              <Input
                id="linkedin"
                value={settings.socialMedia.linkedin}
                onChange={(e) => handleInputChange('socialMedia', 'linkedin', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="twitter" className="text-gray-300">Twitter</Label>
              <Input
                id="twitter"
                value={settings.socialMedia.twitter}
                onChange={(e) => handleInputChange('socialMedia', 'twitter', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="instagram" className="text-gray-300">Instagram</Label>
              <Input
                id="instagram"
                value={settings.socialMedia.instagram}
                onChange={(e) => handleInputChange('socialMedia', 'instagram', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
        </div>

        {/* SEO Settings */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">SEO Settings</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="metaTitle" className="text-gray-300">Meta Title</Label>
              <Input
                id="metaTitle"
                value={settings.seo.metaTitle}
                onChange={(e) => handleInputChange('seo', 'metaTitle', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="metaDescription" className="text-gray-300">Meta Description</Label>
              <Input
                id="metaDescription"
                value={settings.seo.metaDescription}
                onChange={(e) => handleInputChange('seo', 'metaDescription', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label htmlFor="keywords" className="text-gray-300">Keywords</Label>
              <Input
                id="keywords"
                value={settings.seo.keywords}
                onChange={(e) => handleInputChange('seo', 'keywords', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
        </div>

        {/* Analytics */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">Analytics & Tracking</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="googleAnalyticsId" className="text-gray-300">Google Analytics ID</Label>
              <Input
                id="googleAnalyticsId"
                value={settings.analytics.googleAnalyticsId}
                onChange={(e) => handleInputChange('analytics', 'googleAnalyticsId', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="GA-XXXXXXXXX-X"
              />
            </div>
            <div>
              <Label htmlFor="facebookPixelId" className="text-gray-300">Facebook Pixel ID</Label>
              <Input
                id="facebookPixelId"
                value={settings.analytics.facebookPixelId}
                onChange={(e) => handleInputChange('analytics', 'facebookPixelId', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="XXXXXXXXXXXXXXX"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
