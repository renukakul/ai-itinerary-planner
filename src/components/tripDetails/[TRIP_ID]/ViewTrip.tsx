import * as React from "react";
import { db } from "@/service/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "./InfoSection";
import Hotels from "./Hotels";
import PlacesToVisit from "./PlacesToVisit";
import Footer from "./Footer";

const ViewTrip = () => {
  const [trip, setTrip] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { tripId } = useParams();

  useEffect(() => {
    if (tripId) {
      tripDetails();
    }
  }, [tripId]);

  const tripDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const docRef = doc(db, "AITrips", tripId!);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTrip(docSnap.data());
        toast.success("Trip loaded successfully");
      } else {
        setError("Trip not found");
        toast.error("Trip not found");
      }
    } catch (error) {
      console.error("Error fetching trip:", error);
      setError("Failed to load trip details");
      toast.error("Connection error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-xl font-medium text-gray-800 mb-2">Loading your trip</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg 
            className="w-10 h-10 text-red-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Error loading trip</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={tripDetails}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <InfoSection trip={trip} />
        <Hotels trip={trip} />
        <PlacesToVisit trip={trip} />
      </main>
      <Footer />
    </div>
  );
};

export default ViewTrip;