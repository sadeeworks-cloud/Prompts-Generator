
import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { AnalysisDisplay } from './components/AnalysisDisplay';
import { PromptCard } from './components/PromptCard';
import { analyzeImageAndGeneratePrompts } from './services/geminiService';
import type { ImageAnalysis, GeneratedPrompts } from './types';
import { UploadIcon } from './components/icons';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ImageAnalysis | null>(null);
  const [prompts, setPrompts] = useState<GeneratedPrompts | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback(async (file: File) => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    setPrompts(null);
    setImageFile(file);
    setImagePreviewUrl(URL.createObjectURL(file));

    try {
      const result = await analyzeImageAndGeneratePrompts(file);
      if (result) {
        setAnalysis(result.analysis);
        setPrompts(result.prompts);
      } else {
        setError('Failed to get a valid response from the AI. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while analyzing the image. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const resetState = () => {
    setImageFile(null);
    setImagePreviewUrl(null);
    setAnalysis(null);
    setPrompts(null);
    setError(null);
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
            PromptForge
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Turn Your Images into Masterpiece Prompts
          </p>
        </header>

        <main className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8 border border-gray-700">
            <ImageUploader 
              onImageUpload={handleImageUpload} 
              imagePreviewUrl={imagePreviewUrl}
              isLoading={isLoading}
              onReset={resetState}
            />

            {isLoading && (
              <div className="text-center my-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto"></div>
                  <p className="mt-4 text-gray-300">Forging prompts... The AI is thinking!</p>
              </div>
            )}

            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg my-6" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {analysis && prompts && !isLoading && (
              <div className="mt-8 space-y-8 animate-fade-in">
                <AnalysisDisplay analysis={analysis} />
                
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-100">Generated Prompts</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(prompts).map(([key, value]) => (
                       <PromptCard key={key} title={key.charAt(0).toUpperCase() + key.slice(1)} prompt={value} />
                    ))}
                  </div>
                </div>
              </div>
            )}

             {!imageFile && !isLoading && (
              <div className="text-center text-gray-500 mt-8">
                  <UploadIcon className="mx-auto h-12 w-12" />
                  <p className="mt-2">Upload an image to start</p>
              </div>
            )}

          </div>
        </main>

        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Powered by Gemini AI</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
