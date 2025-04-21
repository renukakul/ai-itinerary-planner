import * as React from "react";
import { db } from "@/service/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "./InfoSection";
import Hotels from "./Hotels";
// import PlacesToVisit from "./PlacesToVisit";


const ViewTrip = () => {
  const [trip, setTrip] = useState<Record<string, any> | null>(null);
  const { tripId } = useParams();

  useEffect(() => {
    if (tripId) {
      tripDetails();
    }
  }, [tripId]);

  const tripDetails = async () => {
    try {
      const docRef = doc(db, "AITrips", tripId!); // Non-null assertion because you've already checked it
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setTrip(docSnap.data());
        toast.success("Trip details fetched successfully");
      } else {
        console.log("No such document!");
        toast.error("No such document!");
      }
    } catch (error) {
      console.error("Error fetching trip:", error);
      toast.error("Failed to fetch trip details");
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-40 bg-gray-100 min-h-screen"> 
      {/* Information Section */}
      <InfoSection trip={trip} />

      {/* Recommanded Hotels */}
      <Hotels trip={trip} />

      {/* Daily plan */}
      {/* <PlacesToVisit trip={trip} /> */}

      {/* Footer */}
    </div>
  );
};

export default ViewTrip;
