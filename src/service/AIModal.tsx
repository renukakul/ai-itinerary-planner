import { GoogleGenAI } from '@google/genai';

// Original function to generate travel plan
export const generateTravelPlan = async (prompt: string) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: import.meta.env.VITE_GOOGLE_GEMINI_API_KEY,
    });

    const config = {
      responseMimeType: 'application/json',
    };

    const model = 'gemini-1.5-flash';

    const contents = [
      {
        role: 'user',
        parts: [{ text: prompt }],
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

    // 🧼 Clean and extract valid JSON
    const startIndex = fullResponse.indexOf('{');
    const endIndex = fullResponse.lastIndexOf('}');

    if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
      throw new Error("No valid JSON found in AI response");
    }

    const jsonStr = fullResponse.slice(startIndex, endIndex + 1);
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Error generating travel plan:', error);
    throw error;
  }
};

// Helper function to process and standardize the response format
const processAIResponse = (response: any) => {
  if (!response || !response.tripData) return response;

  // Map the response to the desired structure
  const processedResponse = {
    ...response,
    tripData: {
      ...response.tripData,
      // Check if 'HotelOptions' exists and transform to 'hotels'
      hotels: response.tripData?.HotelOptions || response.tripData?.hotels || [],
      dailyItinerary: response.tripData?.itinerary?.map((day: any) => ({
        day: day.day,
        bestTime: day.bestTime,
        geoCoordinates: day.geoCoordinates,
        placeName: day.location, // Renaming `location` to `placeName`
        placeDetails: day.placeDetails,
        placeImageUrl: day.placeImageUrl,
        rating: day.rating,
        ticketPricing: day.ticketPricing,
        timeTravel: day.timeTravel,
      })) || response.tripData?.dailyItinerary || []
    }
  };

  return processedResponse;
};
// Wrapper function to handle the travel plan and process the result
export const generateTravelPlanWithStandardFormat = async (prompt: string) => {
  try {
    // Call the original function to generate the travel plan
    const result = await generateTravelPlan(prompt);

    // Process the result to match the expected structure
    return processAIResponse(result);
  } catch (error) {
    console.error("Error in generating and processing travel plan:", error);
    throw error;
  }
};
