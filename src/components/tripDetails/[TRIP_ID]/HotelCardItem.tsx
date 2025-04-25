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
        <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full flex flex-col hover:shadow-md  transition-all duration-200 border border-gray-100 group-hover:border-orange-100">
          {/* Image */}
          <div className="relative h-40 w-full overflow-hidden">
            <img
              src={photoUrl || '/hotel.jpeg'}
              alt={hotel.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/hotel.jpeg';
              }}
            />
            {hotel.rating && (
              <div className="absolute bottom-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center">
                ★ {hotel.rating}
              </div>
            )}
          </div>

          {/* Card Content */}
          <div className="p-3 flex-grow flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
              {hotel.name}
            </h3>
            
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {hotel.description}
            </p>

            <div className="mt-auto">
              <div className="flex justify-between items-center">
                <p className="text-md font-semibold text-orange-600">
                  {hotel.price ? `${hotel.price}` : 'Price unavailable'}
                </p>
                {hotel.distance && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {hotel.distance} from center
                  </span>
                )}
              </div>

              <div className="mt-1 flex items-center text-xs text-gray-500">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
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