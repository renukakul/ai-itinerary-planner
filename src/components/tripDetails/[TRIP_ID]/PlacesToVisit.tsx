// import React from 'react';

// function PlacesToVisit({ trip }: { trip: Record<string, any> | null }) {
//   return (
//     <div>
//       <h2 className="text-2xl font-semibold text-gray-800 mb-4">Places to Visit</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {trip?.tripData?.itinerary?.map((item: { day: number; plan: string }) => (
//           <div
//             key={item.day} // Use the unique 'day' property as the key
//             className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
//           >
//             <h3 className="text-xl font-semibold text-gray-800">Day {item.day}</h3>
//             <p className="text-gray-600 mt-2">{item.plan}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default PlacesToVisit;