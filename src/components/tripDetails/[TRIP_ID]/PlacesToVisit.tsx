import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }: { trip: Record<string, any> | null }) {
  const itinerary = trip?.tripData?.itinerary || [];

  if (!trip) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-600">Loading itinerary...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Places to Visit</h2>
      
      {itinerary.length > 0 ? (
        <div className="space-y-8">
          {itinerary.map((dayPlan: any) => (
            <div key={dayPlan.day} className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                Day {dayPlan.day}
              </h3>
              
              {dayPlan.plan?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dayPlan.plan.map((place: any) => (
                    <PlaceCardItem key={`${dayPlan.day}-${place.placeName}`} place={place} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No places scheduled for this day</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No itinerary available for this trip.</p>
        </div>
      )}
    </div>
  );
}

export default PlacesToVisit;