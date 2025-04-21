import * as React from "react";
import { db } from "@/service/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

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
    <div>
      {/* Information Section */}

      {/* Recommanded Hotels */}

      {/* Daily plan */}

      {/* Footer */}
    </div>
  );
};

export default ViewTrip;
