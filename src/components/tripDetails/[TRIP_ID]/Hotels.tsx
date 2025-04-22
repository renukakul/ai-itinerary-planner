import React from 'react';
import { Link } from 'react-router-dom';

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
            <Link
              key={index}
              to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName} ${hotel?.hotelAddress}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="bg-white p-4 rounded-lg shadow-md hover:scale-105 transition-all duration-300 cursor-pointer">
                <img
                  src={"/hotel.jpeg"}
                  alt={hotel.hotelName}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">{hotel.hotelName}</h3>
                <p className="text-gray-600">{hotel.description}</p>
                <p className="text-red-500 font-bold mt-2">{hotel.price} per night</p>
                <p className="text-gray-500 text-sm mt-1">Rating: {hotel.rating} ★</p>
                <p className="text-gray-500 text-sm mt-1">{hotel.hotelAddress}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-600">No hotels available for this trip.</p>
        )}
      </div>
    </div>
  );
}
export default Hotels;