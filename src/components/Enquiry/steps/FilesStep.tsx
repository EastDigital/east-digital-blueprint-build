
import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Upload, File, X, AlertCircle } from 'lucide-react';
import { StepProps } from '../types';
import { cn } from '@/lib/utils';

export const FilesStep: React.FC<StepProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrev
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setUploadedFiles(prev => [...prev, ...files]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...files]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd upload files to storage here
    updateFormData({ uploadedFiles: uploadedFiles.map(f => f.name) });
    onNext();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Share Your Files
          </h2>
          <p className="text-gray-300">
            Upload any relevant files, documents, or references for your project
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300",
              dragActive
                ? "border-eastdigital-orange bg-eastdigital-orange/10"
                : "border-gray-600 hover:border-gray-500"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-eastdigital-orange/20 rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-eastdigital-orange" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Drag & drop files here
                </h3>
                <p className="text-gray-400 mb-4">
                  or click to browse your files
                </p>
                
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.zip,.rar"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                
                <label htmlFor="file-upload">
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Choose Files
                  </Button>
                </label>
              </div>
              
              <div className="text-sm text-gray-400">
                <p>Supported formats: PDF, DOC, DOCX, JPG, PNG, GIF, ZIP, RAR</p>
                <p>Maximum file size: 10MB per file</p>
              </div>
            </div>
          </div>

          {uploadedFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-3"
            >
              <h3 className="text-lg font-semibold text-white">Uploaded Files</h3>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <File className="h-5 w-5 text-eastdigital-orange" />
                      <div>
                        <p className="text-white font-medium">{file.name}</p>
                        <p className="text-gray-400 text-sm">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFile(index)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
              <div className="text-sm text-blue-200">
                <p className="font-medium mb-1">Optional Step</p>
                <p>
                  Files help us understand your project better and provide more accurate estimates. 
                  You can skip this step and upload files later if needed.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onPrev}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <Button
              type="submit"
              className="flex items-center gap-2 bg-eastdigital-orange hover:bg-eastdigital-orange/90"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
