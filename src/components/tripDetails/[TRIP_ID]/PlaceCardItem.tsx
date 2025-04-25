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
    <div className="relative group">
      <Link 
        to={`https://www.google.com/maps/search/?api=1&query=${place.placeName} ${place.address}`} 
        target="_blank" 
        rel="noopener noreferrer"
      >    
        <div className='h-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-orange-100 overflow-hidden'>
          {/* Image with loading state */}
          <div className='relative h-48 w-full overflow-hidden'>
            {loading ? (
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 animate-pulse"></div>
            ) : (
              <img 
                src={photoUrl || '/placeCard.jpeg'} 
                alt={place.placeName} 
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeCard.jpeg';
                }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            
            {dayNumber && (
              <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
                Day {dayNumber}
              </div>
            )}
          </div>

          {/* Content container */}
          <div className='p-4'>
            <div className='flex justify-between items-start mb-2'>
              <h3 className='text-lg font-bold text-gray-900 line-clamp-1 flex-1'>
                {place.placeName}
              </h3>
              {place.rating && (
                <div className='flex items-center bg-orange-500/10 px-2 py-1 rounded-full ml-2'>
                  <span className='text-orange-500 text-sm font-bold mr-1'>★</span>
                  <span className='text-orange-700 text-xs font-medium'>{place.rating}</span>
                </div>
              )}
            </div>
            
            {place.placeDetails && (
              <p className='text-gray-600 text-sm line-clamp-2 mb-3'>
                {place.placeDetails}
              </p>
            )}
            
            <div className='space-y-2'>
              {place.ticketPricing && (
                <div className='flex items-center'>
                  <svg className="w-4 h-4 text-gray-400 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className='text-orange-600 font-medium text-sm'>
                    {place.ticketPricing}
                  </span>
                </div>
              )}
              
              {place.bestTime && (
                <div className='flex items-center'>
                  <svg className="w-4 h-4 text-gray-400 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className='text-gray-600 text-sm'>
                    Best time: {place.bestTime}
                  </span>
                </div>
              )}
              
              {place.address && (
                <div className='flex items-start'>
                  <svg className="w-4 h-4 text-gray-400 mr-1.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <p className='text-gray-500 text-sm line-clamp-1'>
                    {place.address}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PlaceCardItem;