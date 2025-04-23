import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function PlaceCardItem({ place, dayNumber }: { place: any; dayNumber?: number }) {
  const [photoUrl, setPhotoUrl] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const GetPlacePhoto = async () => {
      try {
        if (!place?.placeName) return;
        
        setLoading(true);
        const data = { textQuery: place.placeName };
        const result = await GetPlaceDetails(data);
        
        if (isMounted) {
          const photoArray = result.data?.places?.[0]?.photos;
          if (photoArray?.length > 0) {
            const photoRef = photoArray[0].name;
            const constructedUrl = PHOTO_REF_URL.replace("{NAME}", photoRef);
            setPhotoUrl(constructedUrl);
          } else {
            setPhotoUrl(null);
          }
        }
      } catch (error) {
        console.error("Error fetching place details:", error);
        if (isMounted) setPhotoUrl(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    GetPlacePhoto();
    
    return () => {
      isMounted = false;
    };
  }, [place]);

  return (
    <Link 
      to={`https://www.google.com/maps/search/?api=1&query=${place.placeName} ${place.address}`} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block h-full group"
    >    
      <div className='flex gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-200 cursor-pointer h-full'>
        {/* Image container with skeleton loading */}
        <div className='relative min-w-[120px] h-[120px] rounded-xl overflow-hidden flex-shrink-0'>
          {loading ? (
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          ) : (
            <img 
              src={photoUrl || '/placeCard.jpeg'} 
              alt={place.placeName} 
              className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeCard.jpeg';
              }}
            />
          )}
          {dayNumber && (
            <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-md">
              Day {dayNumber}
            </div>
          )}
        </div>

        {/* Content container */}
        <div className='flex-1 flex flex-col justify-between min-w-0'>
          <div>
            <h3 className='text-lg font-bold text-gray-900 line-clamp-1'>
              {place.placeName}
            </h3>
            {place.placeDetails && (
              <p className='text-gray-600 text-sm line-clamp-2 mt-1'>
                {place.placeDetails}
              </p>
            )}
          </div>
          
          <div className='mt-2 space-y-1'>
            {place.ticketPricing && (
              <div className='flex items-center'>
                <span className='text-gray-500 text-sm mr-1'>Ticket:</span>
                <span className='text-blue-600 font-semibold text-sm'>
                  {place.ticketPricing}
                </span>
              </div>
            )}
            
            <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
              {place.rating && (
                <div className='flex items-center bg-yellow-50 px-2 py-1 rounded-full'>
                  <span className='text-yellow-500 text-sm font-bold mr-1'>★</span>
                  <span className='text-gray-700 text-xs font-medium'>{place.rating}</span>
                </div>
              )}
              
              {place.bestTime && (
                <div className='flex items-center bg-green-50 px-2 py-1 rounded-full'>
                  <svg className="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className='text-gray-700 text-xs font-medium'>{place.bestTime}</span>
                </div>
              )}
            </div>
            
            {place.address && (
              <div className='flex items-start mt-1'>
                <svg className="w-3 h-3 text-gray-400 mt-0.5 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <p className='text-gray-500 text-xs line-clamp-1'>
                  {place.address}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;