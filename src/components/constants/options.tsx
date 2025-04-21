
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

export const AI_PROMPT = `Generate a {totalDays} days travel itinerary in JSON format for location:{location} for a {headcount} people with a {budget} budget. Prioritize top-rated (4.0+ stars) hotels. Include hotel details and daily itinerary with places, ratings, and travel times and best time to visit those places .enerate Travel plan for Location: {location}, for {totalDays} days for a {headcount} person/people with a {budget} budget, give me a hotels options list with hotel name , hotel address , price, hotel image url, geo coordinates, rating, description, and suggest itinerary with placename, place details, place image url, geo coordinates, ticket pricing, rating, time travel each of the location for 3 days with each day plan with best time to visit in JSON format` 
