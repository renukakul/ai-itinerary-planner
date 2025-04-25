import { db } from '@/service/FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { use, useEffect, useState } from 'react'
import TripCardItem from './tripCardItem';// Adjust the path as per your project structure
import { useNavigate } from 'react-router-dom';

function MyTrips() {

    const navigate = useNavigate();
    const [userTrips, setUserTrips] = useState<{ id: string; [key: string]: any }[]>([]);

    useEffect(() => {
        GetUSerTrips();
      }, []);
/**
 * 
 * @returns {Promise<void>}
 * Fetches the trips of the logged-in user from the database and updates the state.
 */
    const GetUSerTrips=async()=>{
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user) {
            navigate('/'); // Redirect to home if user is not logged in 
            return ;
        }
        
        // Fetch user trips from the database
        const q= query(
            collection(db, "AITrips"),
            where("userEmail", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        setUserTrips([]); // Clear previous trips
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setUserTrips(prevTrips => [...prevTrips, { id: doc.id, ...doc.data() }]);
        }
        );
    }

  return (
    <div className='max-w-4xl mx-auto px-4 py-8 md:py-12 animate-fade-in'> 
      <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent'> My Trips </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
            {userTrips?.length>0? userTrips.map((trip,index)=>(
                <TripCardItem key={index} trip={trip} />
            ))
        :[1,2,3,4,5,6].map((item,index)=>(
            <div key={index} className="flex flex-col items-center justify-center">
                <div className="bg-white shadow-md rounded-lg p-4 animate-pulse">
                    <div className="p-4">
                        <h2 className="text-xl font-semibold text-gray-800">Loading...</h2>
                        <p className="text-gray-600 text-sm mb-2">Loading...</p>
                    </div>
                </div>
            </div>
        )

        
            )}
        </div>
    </div>
  )
}

export default MyTrips
