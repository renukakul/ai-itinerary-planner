import React from 'react';
import { Link } from 'react-router-dom';
import HotelCardItem from './HotelCardItem';

function Hotels({ trip }: { trip: Record<string, any> | null }) {
  const hotels = trip?.tripData?.hotels || [];

  if (!trip) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 mb-3 rounded-full bg-orange-100 text-orange-600 animate-pulse">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <p className="text-gray-600">Loading hotel recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Recommended Stays
              {hotels.length > 0 && (
                <span className="ml-2 text-base font-medium text-orange-600">
                  {hotels.length} options
                </span>
              )}
            </h2>
            <p className="text-gray-500 mt-1">Perfect accommodations for your trip</p>
          </div>
          {hotels.length > 3 && (
            <Link 
              to="#" 
              className="flex items-center text-orange-600 hover:text-orange-800 font-medium transition-colors group"
            >
              View all
              <svg 
                className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          )}
        </div>

        {hotels.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {hotels.slice(0, 4).map((hotel: any, index: number) => (
              <HotelCardItem
                key={`${hotel.id || index}-${hotel.name}`}
                hotel={hotel}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8 text-center border border-orange-100">
            <svg
              className="mx-auto h-14 w-14 text-orange-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <h3 className="mt-4 text-xl font-semibold text-gray-800">No hotels found</h3>
            <p className="mt-2 text-gray-600 max-w-md mx-auto">
              We couldn't find hotel recommendations for your destination. Try adjusting your filters.
            </p>
            <button className="mt-4 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-colors">
              Refresh Recommendations
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Hotels;