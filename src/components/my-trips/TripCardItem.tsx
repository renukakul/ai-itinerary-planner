import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

function TripCardItem({ trip }: { trip: Record<string, any> }) {
  const [photoUrl, setPhotoUrl] = React.useState<string | null>(null);
  
  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.userSelection?.location?.label,
      };
      const result = await GetPlaceDetails(data).then((res) => {
        const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", res.data.places[0].photos[0].name);
        setPhotoUrl(PhotoUrl);
      });
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  return (
    <Link 
      to={'/view-trip/' + trip.id} 
      className="group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:border-orange-100 transition-all h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={photoUrl || "/PlaceHolder.jpeg"} 
            alt="Trip destination" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <span className="text-white font-semibold text-sm">
              {trip?.userSelection?.totalDays || "N/A"} day trip
            </span>
          </div>
        </div>
        
        <div className="p-5 flex-grow">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
            {trip?.userSelection?.location?.label || "Unnamed location"}
          </h3>
          
          <div className="flex items-center gap-2 text-gray-600 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">
              {new Date(trip?.userSelection?.startDate).toLocaleDateString()} - {new Date(trip?.userSelection?.endDate).toLocaleDateString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-sm text-gray-600">
                {trip?.userSelection?.headcount || "N/A"} travelers
              </span>
            </div>
            
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-medium px-3 py-1 rounded-full">
              ${trip?.userSelection?.budget || "N/A"}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default TripCardItem