
import React, { useState } from 'react';
import { CopyIcon, CheckIcon } from './icons';

interface PromptCardProps {
  title: string;
  prompt: string;
}

export const PromptCard: React.FC<PromptCardProps> = ({ title, prompt }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-lg font-semibold text-purple-300">{title}</h4>
          <button
            onClick={handleCopy}
            className={`p-2 rounded-md transition-colors ${
              copied ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
            aria-label="Copy prompt"
          >
            {copied ? <CheckIcon className="w-5 h-5" /> : <CopyIcon className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">{prompt}</p>
      </div>
    </div>
  );
};
