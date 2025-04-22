// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';

export const generateTravelPlan = async (prompt: string) => {
    try {
      const ai = new GoogleGenAI({
      apiKey: import.meta.env.VITE_GOOGLE_GEMINI_API_KEY,
      });
  
      const config = {
        responseMimeType: 'application/json', // Request JSON response
      };
  
      const model = 'gemini-1.5-flash';
  
  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt}],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let fullResponse = '';
      for await (const chunk of response) {
        fullResponse += chunk.text;
      }
  
      // Parse JSON response
      return JSON.parse(fullResponse);
    } catch (error) {
      console.error('Error generating travel plan:', error);
      throw error;
    }
  };
