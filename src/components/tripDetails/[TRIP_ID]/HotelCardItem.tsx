import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function HotelCardItem({ hotel, index }: { hotel: any; index: number }) {
  const [photoUrl, setPhotoUrl] = React.useState<string | null>(null);

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: hotel?.name,
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
    <div className="group">
      <Link
        key={index}
        to={`https://www.google.com/maps/search/?api=1&query=${hotel?.name} ${hotel?.address}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-blue-100">
          {/* Image with loading state */}
          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={photoUrl || '/hotel.jpeg'}
              alt={hotel.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/hotel.jpeg';
              }}
            />
            {hotel.rating && (
              <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-semibold flex items-center">
                ★ {hotel.rating}
              </div>
            )}
          </div>

          {/* Card Content */}
          <div className="p-4 flex-grow flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">
              {hotel.name}
            </h3>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {hotel.description}
            </p>

            <div className="mt-auto">
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-blue-600">
                  {hotel.price ? `${hotel.price} per night` : 'Price unavailable'}
                </p>
                {hotel.distance && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {hotel.distance} from center
                  </span>
                )}
              </div>

              <div className="mt-2 flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="line-clamp-1">{hotel.Address || hotel.address}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HotelCardItem;