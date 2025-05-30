
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, Plus, Upload } from 'lucide-react';

interface ImageManagerProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  label: string;
  allowMultiple?: boolean;
}

export const ImageManager: React.FC<ImageManagerProps> = ({
  images,
  onImagesChange,
  label,
  allowMultiple = false
}) => {
  const [newImageUrl, setNewImageUrl] = useState('');
  const [imageUrls, setImageUrls] = useState('');

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      if (allowMultiple) {
        onImagesChange([...images, newImageUrl.trim()]);
      } else {
        onImagesChange([newImageUrl.trim()]);
      }
      setNewImageUrl('');
    }
  };

  const handleBulkAdd = () => {
    if (imageUrls.trim()) {
      const urls = imageUrls.split('\n').map(url => url.trim()).filter(url => url.length > 0);
      if (allowMultiple) {
        onImagesChange([...images, ...urls]);
      } else {
        onImagesChange(urls.slice(0, 1));
      }
      setImageUrls('');
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onImagesChange(updatedImages);
  };

  return (
    <div className="space-y-4">
      <Label className="text-white">{label}</Label>
      
      {/* Display existing images */}
      {images.length > 0 && (
        <div className="space-y-2">
          {images.map((image, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 bg-gray-800 rounded border border-gray-700">
              <img src={image} alt={`${label} ${index + 1}`} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1 text-sm text-gray-300 truncate">{image}</div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleRemoveImage(index)}
                className="border-red-700 text-red-400 hover:bg-red-900"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Add new image - single URL */}
      {(allowMultiple || images.length === 0) && (
        <div className="flex space-x-2">
          <Input
            placeholder="Enter single image URL"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            onKeyPress={(e) => e.key === 'Enter' && handleAddImage()}
          />
          <Button
            type="button"
            onClick={handleAddImage}
            className="bg-eastdigital-orange hover:bg-eastdigital-orange/90"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Bulk add - multiple URLs */}
      {allowMultiple && (
        <div className="space-y-2">
          <Label className="text-gray-300 text-sm">Or add multiple URLs (one per line):</Label>
          <div className="flex space-x-2">
            <Textarea
              placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg&#10;https://example.com/image3.jpg"
              value={imageUrls}
              onChange={(e) => setImageUrls(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              rows={3}
            />
            <Button
              type="button"
              onClick={handleBulkAdd}
              className="bg-eastdigital-orange hover:bg-eastdigital-orange/90 self-start"
            >
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
