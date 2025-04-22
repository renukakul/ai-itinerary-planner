import React from 'react';
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }: { place: any }) {
  return (
    <Link 
      to={`https://www.google.com/maps/search/?api=1&query=${place.placeName} ${place.address}`} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block" // Added block to make Link take full width
    >    
      <div className='flex gap-4 p-4 bg-white rounded-lg shadow-sm hover:scale-[1.02] hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer h-full'>
        {/* Image container with fixed aspect ratio */}
        <div className='min-w-[100px] h-[100px] rounded-xl overflow-hidden'>
          <img 
            src={'/placeCard.jpeg'} 
            alt={place.placeName} 
            className='w-full h-full object-cover'
          />
        </div>

        {/* Content container with proper alignment */}
        <div className='flex-1 flex flex-col justify-between'>
          <div>
            <h3 className='text-lg font-semibold text-gray-800 line-clamp-1'>{place.placeName}</h3>
            <p className='text-gray-600 text-sm line-clamp-2 mt-1'>{place.placeDetails}</p>
          </div>
          
          <div className='mt-2'>
            {place.ticketPricing && (
              <p className='text-red-500 font-bold text-sm'>
                Ticket Price: <span className='text-gray-700'>{place.ticketPricing}</span>
              </p>
            )}
            <div className='flex flex-wrap items-center gap-x-4 gap-y-1 mt-1'>
              <p className='text-gray-500 text-sm flex items-center'>
                <span className='text-yellow-500 mr-1'>★</span> {place.rating}
              </p>
              <p className='text-gray-500 text-sm'>
                Best Time: <span className='text-green-600'>{place.bestTime}</span>
              </p>
            </div>
            {place.address && (
              <p className='text-gray-500 text-xs mt-1 line-clamp-1'>
                {place.address}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;