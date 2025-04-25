import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }: { trip: Record<string, any> | null }) {
  const itinerary = trip?.tripData?.itinerary || [];

  if (!trip) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 mb-3 rounded-full bg-orange-100 text-orange-600">
            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <p className="text-md font-medium text-gray-600">Loading your itinerary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Places to Visit</h2>
        <p className="text-gray-500 text-sm">Your personalized travel itinerary</p>
      </div>
      
      {itinerary.length > 0 ? (
        <div className="space-y-6">
          {itinerary.map((dayPlan: any) => (
            <div key={dayPlan.day} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="bg-gradient-to-r from-orange-50 to-red-50 px-6 py-4 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <span className="flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-orange-500 text-white text-sm font-semibold">
                    {dayPlan.day}
                  </span>
                  Day {dayPlan.day} Itinerary
                </h3>
              </div>
              
              <div className="p-6">
                {dayPlan.plan?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dayPlan.plan.map((place: any) => (
                      <PlaceCardItem 
                        key={`${dayPlan.day}-${place.placeName}`} 
                        place={place} 
                        dayNumber={dayPlan.day}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-gray-50 rounded-lg">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-3 text-lg font-medium text-gray-800">No activities planned</h3>
                    <p className="mt-1 text-sm text-gray-500">Add some places to make the most of your day</p>
                    <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200">
                      Add Activities
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-xs p-8 text-center max-w-2xl mx-auto">
          <svg className="mx-auto h-14 w-14 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-xl font-medium text-gray-800">No itinerary created yet</h3>
          <p className="mt-2 text-gray-500">We couldn't find any planned activities for your trip.</p>
          <div className="mt-6">
            <button className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-sm transition-all duration-200">
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Plan your itinerary
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlacesToVisit;