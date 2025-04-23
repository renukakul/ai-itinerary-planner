import React from 'react';
import { Link } from 'react-router-dom';
import HotelCardItem from './HotelCardItem';

function Hotels({ trip }: { trip: Record<string, any> | null }) {
  // Access hotels through the correct path
  const hotels = trip?.tripData?.hotels || []; 

  if (!trip) {
    return <p className="text-gray-600">Loading hotels...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recommended Hotels</h2>
      <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {hotels.length ? (
          hotels.map((hotel: any, index: number) => (
         <HotelCardItem
            key={index}
            hotel={hotel}
            index={index}
          />
          ))
        ) : (
          <p className="text-gray-600">No hotels available for this trip.</p>
        )}
      </div>
    </div>
  );
}
export default Hotels;