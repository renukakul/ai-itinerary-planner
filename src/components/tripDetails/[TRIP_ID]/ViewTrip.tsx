import { db } from "@/service/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function viewTrip() {
  const [trip, setTripId] = useState<Record<string, any> | null>(null);

  const { tripId } = useParams();
  console.log(tripId);

  useEffect(() => {
    tripId && tripDetails();
  }, [tripId]);

  // used to fetch trip details from the server
  // and display them on the page
  // this function will be called when the component mounts

  const tripDetails = async () => {
    // fetch trip details from the server
    // return trip details
    if (!tripId) {
      throw new Error("Trip ID is undefined");
    }
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setTripId(docSnap.data());
      toast.success("Trip details fetched successfully");
    } else {
      console.log("No such document!");
      throw new Error("No such document!");
      toast.error("No such document!");
    }
    return (
      <div>
        {/* Information Section */}

        {/* Recommanded Hotels */}

        {/* Daily plan */}

        {/* Footer */}
      </div>
    );
  };
}
export default viewTrip;
