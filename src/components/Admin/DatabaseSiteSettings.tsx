
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface SiteSetting {
  id: string;
  key: string;
  value: string;
  description: string;
}

export const DatabaseSiteSettings = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');

      if (error) throw error;

      const settingsMap: Record<string, string> = {};
      data?.forEach((setting: SiteSetting) => {
        settingsMap[setting.key] = setting.value;
      });

      setSettings(settingsMap);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch settings: " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateSetting = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // Update each setting
      for (const [key, value] of Object.entries(settings)) {
        const { error } = await supabase
          .from('site_settings')
          .upsert({ 
            key, 
            value,
            description: getSettingDescription(key),
            updated_at: new Date().toISOString()
          });

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Settings saved successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to save settings: " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getSettingDescription = (key: string): string => {
    const descriptions: Record<string, string> = {
      site_title: 'The main title of your website',
      site_description: 'A brief description of your website',
      contact_email: 'Primary contact email address',
      contact_phone: 'Primary contact phone number',
      company_address: 'Company physical address',
      social_facebook: 'Facebook page URL',
      social_instagram: 'Instagram profile URL',
      social_linkedin: 'LinkedIn profile URL',
      hero_title: 'Main headline on the homepage',
      hero_subtitle: 'Subtitle text on the homepage'
    };
    return descriptions[key] || 'Site setting';
  };

  if (isLoading) {
    return <div className="text-white">Loading settings...</div>;
  }

  const settingFields = [
    { key: 'site_title', label: 'Site Title', type: 'text' },
    { key: 'site_description', label: 'Site Description', type: 'textarea' },
    { key: 'contact_email', label: 'Contact Email', type: 'email' },
    { key: 'contact_phone', label: 'Contact Phone', type: 'tel' },
    { key: 'company_address', label: 'Company Address', type: 'textarea' },
    { key: 'social_facebook', label: 'Facebook URL', type: 'url' },
    { key: 'social_instagram', label: 'Instagram URL', type: 'url' },
    { key: 'social_linkedin', label: 'LinkedIn URL', type: 'url' },
    { key: 'hero_title', label: 'Hero Title', type: 'text' },
    { key: 'hero_subtitle', label: 'Hero Subtitle', type: 'textarea' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Site Settings</h1>
        <Button 
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="bg-eastdigital-orange hover:bg-eastdigital-orange/90"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save All Settings'}
        </Button>
      </div>

      <div className="grid gap-6">
        {settingFields.map((field) => (
          <Card key={field.key} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">{field.label}</CardTitle>
            </CardHeader>
            <CardContent>
              {field.type === 'textarea' ? (
                <Textarea
                  value={settings[field.key] || ''}
                  onChange={(e) => handleUpdateSetting(field.key, e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  rows={3}
                />
              ) : (
                <Input
                  type={field.type}
                  value={settings[field.key] || ''}
                  onChange={(e) => handleUpdateSetting(field.key, e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              )}
              <p className="text-gray-400 text-sm mt-2">
                {getSettingDescription(field.key)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
