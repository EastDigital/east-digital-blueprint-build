
import React, { useState } from 'react';
import { Settings, Save, Upload, Globe, Search } from 'lucide-react';
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
      keywords: 'real estate, technology, digital transformation, 3D visualization',
      ogTitle: 'EastDigital - Real Estate Innovation',
      ogDescription: 'Leading real estate technology solutions and digital transformation services.',
      ogImage: 'https://eastdigital.in/web-images/logo-east-digital-india',
      twitterTitle: 'EastDigital - Real Estate Innovation',
      twitterDescription: 'Leading real estate technology solutions and digital transformation services.',
      twitterImage: 'https://eastdigital.in/web-images/logo-east-digital-india',
      canonicalUrl: 'https://eastdigital.in',
      robots: 'index, follow',
      author: 'EastDigital',
      language: 'en-US',
      alternateLanguages: '',
      structuredData: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "EastDigital",
        "url": "https://eastdigital.in",
        "description": "Leading real estate technology solutions and digital transformation services."
      }, null, 2)
    },
    analytics: {
      googleAnalyticsId: '',
      facebookPixelId: '',
      googleTagManagerId: '',
      googleSearchConsoleId: '',
      bingWebmasterToolsId: ''
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

        {/* Enhanced SEO Settings */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-5 w-5 text-eastdigital-orange" />
            <h3 className="text-lg font-semibold text-white">SEO Settings</h3>
          </div>
          
          {/* Basic SEO */}
          <div className="space-y-4 mb-6">
            <h4 className="text-md font-medium text-white">Basic SEO</h4>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="metaTitle" className="text-gray-300">Meta Title (50-60 characters)</Label>
                <Input
                  id="metaTitle"
                  value={settings.seo.metaTitle}
                  onChange={(e) => handleInputChange('seo', 'metaTitle', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  maxLength={60}
                />
                <span className="text-xs text-gray-400">{settings.seo.metaTitle.length}/60</span>
              </div>
              <div>
                <Label htmlFor="metaDescription" className="text-gray-300">Meta Description (150-160 characters)</Label>
                <Input
                  id="metaDescription"
                  value={settings.seo.metaDescription}
                  onChange={(e) => handleInputChange('seo', 'metaDescription', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  maxLength={160}
                />
                <span className="text-xs text-gray-400">{settings.seo.metaDescription.length}/160</span>
              </div>
              <div>
                <Label htmlFor="keywords" className="text-gray-300">Keywords (comma separated)</Label>
                <Input
                  id="keywords"
                  value={settings.seo.keywords}
                  onChange={(e) => handleInputChange('seo', 'keywords', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="canonicalUrl" className="text-gray-300">Canonical URL</Label>
                  <Input
                    id="canonicalUrl"
                    value={settings.seo.canonicalUrl}
                    onChange={(e) => handleInputChange('seo', 'canonicalUrl', e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="robots" className="text-gray-300">Robots</Label>
                  <select
                    id="robots"
                    value={settings.seo.robots}
                    onChange={(e) => handleInputChange('seo', 'robots', e.target.value)}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
                  >
                    <option value="index, follow">Index, Follow</option>
                    <option value="index, nofollow">Index, No Follow</option>
                    <option value="noindex, follow">No Index, Follow</option>
                    <option value="noindex, nofollow">No Index, No Follow</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Open Graph */}
          <div className="space-y-4 mb-6">
            <h4 className="text-md font-medium text-white">Open Graph (Facebook)</h4>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="ogTitle" className="text-gray-300">OG Title</Label>
                <Input
                  id="ogTitle"
                  value={settings.seo.ogTitle}
                  onChange={(e) => handleInputChange('seo', 'ogTitle', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="ogDescription" className="text-gray-300">OG Description</Label>
                <Input
                  id="ogDescription"
                  value={settings.seo.ogDescription}
                  onChange={(e) => handleInputChange('seo', 'ogDescription', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="ogImage" className="text-gray-300">OG Image URL</Label>
                <Input
                  id="ogImage"
                  value={settings.seo.ogImage}
                  onChange={(e) => handleInputChange('seo', 'ogImage', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
          </div>

          {/* Twitter Cards */}
          <div className="space-y-4 mb-6">
            <h4 className="text-md font-medium text-white">Twitter Cards</h4>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="twitterTitle" className="text-gray-300">Twitter Title</Label>
                <Input
                  id="twitterTitle"
                  value={settings.seo.twitterTitle}
                  onChange={(e) => handleInputChange('seo', 'twitterTitle', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="twitterDescription" className="text-gray-300">Twitter Description</Label>
                <Input
                  id="twitterDescription"
                  value={settings.seo.twitterDescription}
                  onChange={(e) => handleInputChange('seo', 'twitterDescription', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="twitterImage" className="text-gray-300">Twitter Image URL</Label>
                <Input
                  id="twitterImage"
                  value={settings.seo.twitterImage}
                  onChange={(e) => handleInputChange('seo', 'twitterImage', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
          </div>

          {/* Advanced SEO */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-white">Advanced SEO</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="author" className="text-gray-300">Author</Label>
                <Input
                  id="author"
                  value={settings.seo.author}
                  onChange={(e) => handleInputChange('seo', 'author', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="language" className="text-gray-300">Language</Label>
                <Input
                  id="language"
                  value={settings.seo.language}
                  onChange={(e) => handleInputChange('seo', 'language', e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="structuredData" className="text-gray-300">Structured Data (JSON-LD)</Label>
              <textarea
                id="structuredData"
                value={settings.seo.structuredData}
                onChange={(e) => handleInputChange('seo', 'structuredData', e.target.value)}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white min-h-[120px] font-mono text-sm"
                placeholder="Enter JSON-LD structured data"
              />
            </div>
          </div>
        </div>

        {/* Enhanced Analytics */}
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div className="flex items-center space-x-2 mb-4">
            <Globe className="h-5 w-5 text-eastdigital-orange" />
            <h3 className="text-lg font-semibold text-white">Analytics & Tracking</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="googleAnalyticsId" className="text-gray-300">Google Analytics ID</Label>
              <Input
                id="googleAnalyticsId"
                value={settings.analytics.googleAnalyticsId}
                onChange={(e) => handleInputChange('analytics', 'googleAnalyticsId', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="GA-XXXXXXXXX-X or G-XXXXXXXXXX"
              />
            </div>
            <div>
              <Label htmlFor="googleTagManagerId" className="text-gray-300">Google Tag Manager ID</Label>
              <Input
                id="googleTagManagerId"
                value={settings.analytics.googleTagManagerId}
                onChange={(e) => handleInputChange('analytics', 'googleTagManagerId', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="GTM-XXXXXXX"
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
            <div>
              <Label htmlFor="googleSearchConsoleId" className="text-gray-300">Google Search Console Verification</Label>
              <Input
                id="googleSearchConsoleId"
                value={settings.analytics.googleSearchConsoleId}
                onChange={(e) => handleInputChange('analytics', 'googleSearchConsoleId', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Verification meta tag content"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="bingWebmasterToolsId" className="text-gray-300">Bing Webmaster Tools Verification</Label>
              <Input
                id="bingWebmasterToolsId"
                value={settings.analytics.bingWebmasterToolsId}
                onChange={(e) => handleInputChange('analytics', 'bingWebmasterToolsId', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Verification meta tag content"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
