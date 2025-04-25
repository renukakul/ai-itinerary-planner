import { db } from '@/service/FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { use, useEffect, useState } from 'react'
import TripCardItem from './tripCardItem';
import { useNavigate } from 'react-router-dom';

function MyTrips() {
    const navigate = useNavigate();
    const [userTrips, setUserTrips] = useState<{ id: string; [key: string]: any }[]>([]);

    useEffect(() => {
        GetUSerTrips();
    }, []);

    const GetUSerTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user) {
            navigate('/');
            return;
        }
        
        const q = query(
            collection(db, "AITrips"),
            where("userEmail", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        setUserTrips([]);
        querySnapshot.forEach((doc) => {
            setUserTrips(prevTrips => [...prevTrips, { id: doc.id, ...doc.data() }]);
        });
    }

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in'>
            <div className='text-center mb-12'>
                <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4'>
                    My Travel Adventures
                </h1>
                <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
                    Relive your past journeys and plan new ones with WanderWise
                </p>
            </div>
            
            {userTrips?.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {userTrips.map((trip, index) => (
                        <TripCardItem key={index} trip={trip} />
                    ))}
                </div>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {[1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-orange-50 overflow-hidden hover:shadow-md transition-all">
                            <div className="animate-pulse">
                                <div className="h-48 bg-gradient-to-r from-orange-50 to-red-50"></div>
                                <div className="p-6">
                                    <div className="h-6 bg-orange-100 rounded mb-4 w-3/4"></div>
                                    <div className="h-4 bg-orange-50 rounded mb-2 w-full"></div>
                                    <div className="h-4 bg-orange-50 rounded mb-2 w-5/6"></div>
                                    <div className="h-4 bg-orange-50 rounded w-2/3"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {userTrips?.length === 0 && !userTrips && (
                <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-gray-600 mb-4">
                        No trips found. Start planning your first adventure!
                    </h3>
                    <button 
                        onClick={() => navigate('/create-trip')}
                        className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full px-6 py-3 hover:from-orange-600 hover:to-red-600 transition-all shadow-md hover:shadow-lg"
                    >
                        Create New Trip
                    </button>
                </div>
            )}
        </div>
    )
}

export default MyTrips