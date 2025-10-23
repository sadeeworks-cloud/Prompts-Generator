
import React from 'react';
import type { ImageAnalysis } from '../types';

interface AnalysisDisplayProps {
  analysis: ImageAnalysis;
}

const Tag: React.FC<{ children: React.ReactNode, colorClass: string }> = ({ children, colorClass }) => (
    <span className={`text-xs font-medium mr-2 px-2.5 py-1 rounded-full ${colorClass}`}>
        {children}
    </span>
);


export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis }) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
      <h3 className="text-2xl font-bold mb-4 text-gray-100">Image Analysis</h3>
      <div className="space-y-4">
        
        <div>
          <h4 className="font-semibold text-gray-300">Main Subjects</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {analysis.mainSubjects.map((subject, index) => (
              <Tag key={index} colorClass="bg-indigo-900 text-indigo-300">{subject}</Tag>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-300">Setting</h4>
          <p className="text-gray-400 mt-1">{analysis.setting}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-300">Mood</h4>
              <p className="text-gray-400 mt-1">{analysis.mood}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-300">Style</h4>
              <p className="text-gray-400 mt-1">{analysis.style}</p>
            </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-300">Color Palette</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {analysis.colorPalette.map((color, index) => (
              <Tag key={index} colorClass="bg-gray-700 text-gray-300">{color}</Tag>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
