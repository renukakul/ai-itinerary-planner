import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({hotel, index}: {hotel: any, index: number}) {

    const[photoUrl,setPhotoUrl]=React.useState<string | null>(null);
    
    
      useEffect(() => {
        
          hotel&&GetPlacePhoto();
      }, [hotel]);
      
    
      const GetPlacePhoto = async () => {
        try {
          const data = {
            textQuery: hotel?.name,
          };
          const result = await GetPlaceDetails(data).then((res) => {
            console.log("Place details:", res.data);
            console.log("Place details:", res.data.places[0].photos[2].name);
    
            const PhotoUrl=PHOTO_REF_URL.replace("{NAME}",res.data.places[0].photos[0].name);
            console.log("Photo URL:", PhotoUrl);
            setPhotoUrl( PhotoUrl);
          });
        } catch (error) {
          console.error("Error fetching place details:", error);
        }
      };
  return (
    <div>
      <Link
              key={index}
              to={`https://www.google.com/maps/search/?api=1&query=${hotel?.name} ${hotel?.address}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="bg-white p-4 rounded-lg shadow-md hover:scale-105 transition-all duration-300 cursor-pointer">
                <img
                  src={photoUrl|| '/hotel.jpeg'}
                  alt={hotel.name}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">{hotel.name}</h3>
                
                <p className="text-gray-600">{hotel.description}</p>
                <p className="text-red-500 font-bold mt-2">{hotel.price} per night</p>
                <p className="text-gray-500 text-sm mt-1">Rating: {hotel.rating} ★</p>
                <p className="text-gray-500 text-sm mt-1">{hotel.Address}</p>
              </div>
            </Link>
    </div>
  )
}

export default HotelCardItem
