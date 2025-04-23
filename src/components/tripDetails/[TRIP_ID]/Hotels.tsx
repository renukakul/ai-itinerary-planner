import React from 'react';
import { Link } from 'react-router-dom';
import HotelCardItem from './HotelCardItem';

function Hotels({ trip }: { trip: Record<string, any> | null }) {
  const hotels = trip?.tripData?.hotels || [];

  if (!trip) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-gray-600 text-lg">Loading hotels...</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Recommended Hotels
            {hotels.length > 0 && (
              <span className="ml-2 text-lg font-medium text-gray-500">
                ({hotels.length} options)
              </span>
            )}
          </h2>
          {hotels.length > 3 && (
            <Link 
              to="#" 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              View all →
            </Link>
          )}
        </div>

        {hotels.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {hotels.map((hotel: any, index: number) => (
              <HotelCardItem
                key={`${hotel.id || index}-${hotel.name}`}
                hotel={hotel}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No hotels found</h3>
            <p className="mt-2 text-gray-600">
              We couldn't find any hotels matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hotels;