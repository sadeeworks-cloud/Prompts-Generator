
import { Type } from '@google/genai';

export const PromptForgeSchema = {
  type: Type.OBJECT,
  properties: {
    analysis: {
      type: Type.OBJECT,
      properties: {
        mainSubjects: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING },
          description: 'A list of the primary subjects or focal points in the image.'
        },
        setting: { 
          type: Type.STRING,
          description: 'A description of the background, environment, or setting.'
        },
        mood: { 
          type: Type.STRING,
          description: 'The overall emotional tone or mood of the image (e.g., serene, chaotic, joyful).'
        },
        style: { 
          type: Type.STRING,
          description: 'The artistic style of the image (e.g., photorealistic, impressionistic, abstract).'
        },
        colorPalette: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING },
          description: 'A list of the dominant colors in the image.'
        },
      },
      required: ['mainSubjects', 'setting', 'mood', 'style', 'colorPalette'],
    },
    prompts: {
      type: Type.OBJECT,
      properties: {
        realistic: { 
          type: Type.STRING,
          description: 'A detailed, photorealistic prompt for generating the image.'
        },
        fantastical: { 
          type: Type.STRING,
          description: 'A creative, magical, or surreal interpretation of the image content.'
        },
        stylistic: { 
          type: Type.STRING,
          description: 'A prompt focusing on a specific artistic style (e.g., oil painting, anime, watercolor).'
        },
        cinematic: { 
          type: Type.STRING,
          description: 'A prompt describing the scene like a movie still, including camera and lighting details.'
        },
      },
      required: ['realistic', 'fantastical', 'stylistic', 'cinematic'],
    },
  },
  required: ['analysis', 'prompts'],
};


export interface ImageAnalysis {
  mainSubjects: string[];
  setting: string;
  mood: string;
  style: string;
  colorPalette: string[];
}

export interface GeneratedPrompts {
  realistic: string;
  fantastical: string;
  stylistic: string;
  cinematic: string;
}

export interface GeminiResponse {
  analysis: ImageAnalysis;
  prompts: GeneratedPrompts;
}
