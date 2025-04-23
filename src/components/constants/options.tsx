

import { Plane, Heart, Users, icons } from "lucide-react";
export const SelectTravelesList = [
    {
        id: 1,
        name: "Just Me",
        desc: "A solo traveler seeking adventure and exploration.",
        icon: '🧍‍♂️✨',
        people: '1'
    },
    {
        id: 2,
        name: "A Couple",
        desc: "A couple looking for a romantic getaway.",
        icon: '🥂',
        people: '2'
    },
    {
        id: 3,
        name: "A Family",
        desc : "A group of friends or family traveling together.",
        icon: '👨‍👩‍👧‍👦',
        people: '3-10'

    },
    {
        id: 4,
        name: "Friends",
        desc: "A group of friends looking for a fun trip.",
        icon: '👫👬👯‍♂️',
        people: '10-50'
    },
   
]

export const TripBudgetList = [
    {
        id: 1,
        name: "Cheap",
        desc: "A budget-friendly trip with minimal expenses.",
        icons: '💵',
    },
    {
        id: 2,
        name: "Medium",
        desc: "A moderate budget for a comfortable trip.",
        icons: '💰',

    },
    {
        id: 3,
        name: "Luxury", 
        desc: "A luxurious trip with premium experiences.",
        icons: '👑',
    }
]

// export const AI_PROMPT = `Generate a {totalDays} days travel itinerary in JSON format for location:{location} for a {headcount} people with a {budget} budget. Prioritize top-rated (4.0+ stars) hotels. Include hotel details and daily itinerary with places, ratings, and travel times and best time to visit those places .enerate Travel plan for Location: {location}, for {totalDays} days for a {headcount} person/people with a {budget} budget, give me a hotels options list with hotel name , hotel address , price, hotel image url, geo coordinates, rating, description, and suggest itinerary with placename, place details, place image url, geo coordinates, ticket pricing, rating, time travel each of the location for 3 days with each day plan with best time to visit in JSON format` 

export const AI_PROMPT = (totalDays: number, location: string, headcount: number, budget: string) => `
Generate a ${totalDays}-day travel itinerary EXCLUSIVELY within ${location} for ${headcount} people with in ${budget} budget: 
- 5+ HOTEL OPTIONS (all within ${budget})
- DETAILED hourly daily plans
- BACKUP activity options

STRICT REQUIREMENTS:
1. Pure JSON with double quotes ONLY
2. ALL locations within ${location}'s municipal boundaries
3. Hotels MUST have:
   - 4.0+ rating
   - Valid Google Maps links
   - Real photo URLs (1000px+ width)
   - Exact ${budget} pricing

RESPONSE FORMAT:
{
  "budget": "${budget}",
  "headcount": ${headcount},
  "location": "${location}",
  "hotels": [
    {
      "name": "string",
      "address": "string",
      "price": "string (MUST match ${budget})",
      "imageUrl": "string",
      "geoCoordinates": "string",
      "rating": number,
      "proximityScore": number (1-10, 10=best location),
      "bookingLink": "string"
    },
    // MINIMUM 5 HOTELS
  ],
  "itinerary": [
{
"day": number,
"plan": [
{
"placeName": "string",
"placeDetails": "string",
"imageUrl": "string",
"geoCoordinates": "string",
"ticketPricing": "string",
"rating": number,
"timeTravel": "string",
"bestTime": "string"
}
  "proTips": {
    "moneySavingHacks": ["string"],
    "localSecrets": ["string"]
  }
}

CRITICAL RULES:
1. HOTELS:
   - 5+ options minimum
   - ALL must strictly match ${budget}
   - Include direct booking links

2. ITINERARY:
   - day travel itinerary EXCLUSIVELY within ${location}
   - Logical geographic flow

3. DATA QUALITY:
   - No placeholder text
   - All image URLs working
   - All prices verified`;
