
import { GoogleGenAI } from "@google/genai";
import { PromptForgeSchema, type GeminiResponse } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

async function fileToGenerativePart(file: File) {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}

export async function analyzeImageAndGeneratePrompts(imageFile: File): Promise<GeminiResponse | null> {
  const imagePart = await fileToGenerativePart(imageFile);

  const systemInstruction = `You are an expert prompt engineer for generative AI art models like DALL-E 3 and Midjourney. Your task is to analyze the provided image and generate creative, detailed prompts.

1.  **Analyze the image:** Break down the image into its core components:
    *   **Main Subjects:** What are the primary focal points?
    *   **Setting:** Describe the background and environment.
    *   **Mood:** What is the emotional tone (e.g., serene, chaotic, melancholic)?
    *   **Style:** What is the artistic style (e.g., photorealistic, impressionistic, cartoonish)?
    *   **Color Palette:** List the dominant colors.

2.  **Generate Prompts:** Based on your analysis, create four distinct prompts that could be used to generate similar or inspired images. Each prompt should be a different style:
    *   **Realistic:** A highly detailed, photorealistic prompt.
    *   **Fantastical:** A magical or surreal interpretation of the image.
    *   **Stylistic:** A prompt focused on a specific artistic style (e.g., "in the style of Van Gogh", "8-bit pixel art", "art deco poster").
    *   **Cinematic:** A prompt that describes the scene as if it were a shot from a movie, including lighting and camera details.

Return your complete response as a single JSON object that adheres to the provided schema. Do not include any markdown formatting or code fences.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [imagePart] },
    config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: PromptForgeSchema
    }
  });

  const jsonText = response.text.trim();
  try {
    return JSON.parse(jsonText) as GeminiResponse;
  } catch (e) {
    console.error("Failed to parse Gemini response:", e);
    console.error("Raw response text:", jsonText);
    return null;
  }
}
