
import React, { useRef, useState, useCallback } from 'react';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  imagePreviewUrl: string | null;
  isLoading: boolean;
  onReset: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, imagePreviewUrl, isLoading, onReset }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onImageUpload(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleDragEvents = useCallback((e: React.DragEvent<HTMLDivElement>, isEntering: boolean) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isLoading) {
          setIsDragging(isEntering);
      }
  }, [isLoading]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      handleDragEvents(e, false);
      if (!isLoading) {
          const files = e.dataTransfer.files;
          if (files && files.length > 0) {
              onImageUpload(files[0]);
          }
      }
  }, [handleDragEvents, isLoading, onImageUpload]);


  if (imagePreviewUrl) {
    return (
      <div className="relative group">
        <img src={imagePreviewUrl} alt="Preview" className="w-full max-h-[400px] object-contain rounded-lg" />
        {!isLoading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                <button 
                    onClick={onReset}
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                >
                    Upload Another Image
                </button>
            </div>
        )}
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      onDragEnter={(e) => handleDragEvents(e, true)}
      onDragLeave={(e) => handleDragEvents(e, false)}
      onDragOver={(e) => handleDragEvents(e, true)}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors duration-300
        ${isLoading ? 'border-gray-600 bg-gray-700/50 cursor-not-allowed' : 'border-gray-500 hover:border-purple-400 hover:bg-gray-700/50'}
        ${isDragging ? 'border-purple-400 bg-gray-700/50' : ''}
      `}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
        disabled={isLoading}
      />
      <div className="flex flex-col items-center text-gray-400">
        <UploadIcon className="w-10 h-10 mb-3" />
        <p className="font-semibold">Click to upload or drag and drop</p>
        <p className="text-sm">PNG, JPG, or WEBP</p>
      </div>
    </div>
  );
};
