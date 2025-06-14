
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ProjectFormData {
  featured_image: string;
  featured_image_alt: string;
  featured_video: string;
  video_thumbnail: string;
  hero_image: string;
  hero_image_alt: string;
  image_url: string;
  gallery_images: string[];
  gallery_image_alts: string[];
  gallery_videos: string[];
}

interface MediaImagesTabProps {
  data: ProjectFormData;
  onInputChange: (field: keyof ProjectFormData, value: any) => void;
  onGalleryImagesChange: (imagesString: string) => void;
  onGalleryImageAltsChange: (altsString: string) => void;
  onGalleryVideosChange: (videosString: string) => void;
}

export const MediaImagesTab = ({
  data,
  onInputChange,
  onGalleryImagesChange,
  onGalleryImageAltsChange,
  onGalleryVideosChange
}: MediaImagesTabProps) => {
  return (
    <div className="space-y-6">
      {/* Featured Media Section */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Featured Media</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="featured_image" className="text-white">Featured Image URL</Label>
            <Input
              id="featured_image"
              value={data.featured_image}
              onChange={(e) => onInputChange('featured_image', e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="https://example.com/featured-image.jpg"
            />
            {data.featured_image && (
              <img src={data.featured_image} alt="Featured preview" className="mt-2 w-32 h-24 object-cover rounded border border-gray-700" />
            )}
          </div>
          <div>
            <Label htmlFor="featured_image_alt" className="text-white">Featured Image Alt Text</Label>
            <Input
              id="featured_image_alt"
              value={data.featured_image_alt || ''}
              onChange={(e) => onInputChange('featured_image_alt', e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Descriptive alt text for featured image"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Label htmlFor="featured_video" className="text-white">Featured Video URL</Label>
            <Input
              id="featured_video"
              value={data.featured_video || ''}
              onChange={(e) => onInputChange('featured_video', e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="https://example.com/featured-video.mp4"
            />
            {data.featured_video && (
              <video src={data.featured_video} className="mt-2 w-32 h-24 object-cover rounded border border-gray-700" muted />
            )}
          </div>
          <div>
            <Label htmlFor="video_thumbnail" className="text-white">Video Thumbnail URL</Label>
            <Input
              id="video_thumbnail"
              value={data.video_thumbnail || ''}
              onChange={(e) => onInputChange('video_thumbnail', e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="https://example.com/video-thumbnail.jpg"
            />
            {data.video_thumbnail && (
              <img src={data.video_thumbnail} alt="Video thumbnail preview" className="mt-2 w-32 h-24 object-cover rounded border border-gray-700" />
            )}
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Hero Image</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="hero_image" className="text-white">Hero Image URL</Label>
            <Input
              id="hero_image"
              value={data.hero_image}
              onChange={(e) => onInputChange('hero_image', e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="https://example.com/hero-image.jpg"
            />
            {data.hero_image && (
              <img src={data.hero_image} alt="Hero preview" className="mt-2 w-32 h-24 object-cover rounded border border-gray-700" />
            )}
          </div>
          <div>
            <Label htmlFor="hero_image_alt" className="text-white">Hero Image Alt Text</Label>
            <Input
              id="hero_image_alt"
              value={data.hero_image_alt || ''}
              onChange={(e) => onInputChange('hero_image_alt', e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Descriptive alt text for hero image"
            />
          </div>
        </div>
      </div>

      {/* Legacy Image */}
      <div>
        <Label htmlFor="image_url" className="text-white">Legacy Image URL</Label>
        <Input
          id="image_url"
          value={data.image_url}
          onChange={(e) => onInputChange('image_url', e.target.value)}
          className="bg-gray-800 border-gray-700 text-white"
          placeholder="https://example.com/legacy-image.jpg"
        />
      </div>

      {/* Gallery Section */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Gallery</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="gallery_images" className="text-white">Gallery Images (one URL per line)</Label>
            <Textarea
              id="gallery_images"
              value={data.gallery_images?.join('\n') || ''}
              onChange={(e) => onGalleryImagesChange(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="https://example.com/gallery1.jpg&#10;https://example.com/gallery2.jpg"
              rows={5}
            />
            {data.gallery_images && data.gallery_images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {data.gallery_images.slice(0, 6).map((img, idx) => (
                  <img key={idx} src={img} alt={`Gallery ${idx + 1}`} className="w-16 h-12 object-cover rounded border border-gray-700" />
                ))}
                {data.gallery_images.length > 6 && (
                  <div className="w-16 h-12 bg-gray-700 rounded flex items-center justify-center text-xs text-gray-300">
                    +{data.gallery_images.length - 6}
                  </div>
                )}
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="gallery_videos" className="text-white">Gallery Videos (one URL per line)</Label>
            <Textarea
              id="gallery_videos"
              value={data.gallery_videos?.join('\n') || ''}
              onChange={(e) => onGalleryVideosChange(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="https://example.com/video1.mp4&#10;https://example.com/video2.mp4"
              rows={5}
            />
            {data.gallery_videos && data.gallery_videos.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {data.gallery_videos.slice(0, 6).map((video, idx) => (
                  <video key={idx} src={video} className="w-16 h-12 object-cover rounded border border-gray-700" muted />
                ))}
                {data.gallery_videos.length > 6 && (
                  <div className="w-16 h-12 bg-gray-700 rounded flex items-center justify-center text-xs text-gray-300">
                    +{data.gallery_videos.length - 6}
                  </div>
                )}
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="gallery_image_alts" className="text-white">Gallery Image Alt Texts (one per line)</Label>
            <Textarea
              id="gallery_image_alts"
              value={data.gallery_image_alts?.join('\n') || ''}
              onChange={(e) => onGalleryImageAltsChange(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Alt text for gallery image 1&#10;Alt text for gallery image 2"
              rows={5}
            />
            <p className="text-xs text-gray-400 mt-1">
              Each line corresponds to the same-numbered gallery image above
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
