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
        toast.success("Trip details fetched successfully");
      } else {
        setError("No such document exists");
        toast.error("No such document!");
      }
    } catch (error) {
      console.error("Error fetching trip:", error);
      setError("Failed to fetch trip details. Please try again later.");
      toast.error("Failed to fetch trip details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading trip details...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-10 md:px-20 lg:px-40 bg-gray-100 min-h-screen">
      {/* Information Section */}
      <InfoSection trip={trip} />

      {/* Recommended Hotels */}
      <Hotels trip={trip} />

      {/* Daily plan */}
      <PlacesToVisit trip={trip} />

     {/* Footer */}
     <Footer/>
    </div>
  );
};

export default ViewTrip;
