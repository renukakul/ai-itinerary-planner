import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';





function TripCardItem({trip}: { trip: Record<string, any> }) {


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
            console.log("Place details:", res.data);
            console.log("Place details:", res.data.places[0].photos[2].name);
    
            const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", res.data.places[0].photos[0].name);
            console.log("Photo URL:", PhotoUrl);
            setPhotoUrl(PhotoUrl);
          });
        } catch (error) {
          console.error("Error fetching place details:", error);
        }
      };
    
  return (
    <Link to={'/view-trip/'+trip.id} className="flex flex-col items-center justify-center">
        <div>
            <div className="bg-white shadow-md rounded-lg p-4">
            <img src={photoUrl ||"/PlaceHolder.jpeg"} alt="Trip Image" className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    {trip?.userSelection?.location?.label || "Location not available"}
                </h2>
                <p className="text-gray-600 text-sm mb-2"> 
                    {trip?.userSelection?.totalDays|| "Description not available"} Days trip with 
                        {trip?.userSelection?.headcount || "Headcount not available"} people.               
                </p>
                </div>
                {/* Add more details about the trip here */}

        </div>
        </div>
        </Link>
  )
}


export default TripCardItem
