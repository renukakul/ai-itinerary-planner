import { useState, useEffect } from "react";
import { SingleValue } from "react-select";
import { toast } from "sonner";
import { AI_PROMPT } from "@/components/constants/options";
import { generateTravelPlan } from "@/service/AIModal";
import { PlaceOption } from "./types";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/FirebaseConfig";
import { useNavigate } from "react-router-dom";

export const useCreateTripForm = () => {
  const [formdata, setFormData] = useState<Record<string, any>>({});
  const [place, setPlace] = useState<SingleValue<PlaceOption>>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (value: SingleValue<PlaceOption>) => {
    setPlace(value);
    handleInputChange("location", value);
  };

  const OnGenerateTrip = async () => {
    if (!formdata?.location || !formdata?.startDate || 
        !formdata?.endDate || !formdata?.budget || !formdata?.headcount) {
      toast("Please fill all the fields");
      return;
    }
  
    setLoading(true);
    
    try {
      const totalDays = Math.ceil(
        (new Date(formdata.endDate).getTime() - new Date(formdata.startDate).getTime()) / 
        (1000 * 3600 * 24)
      );

      const FINAL_PROMPT = AI_PROMPT(
        totalDays,
        formdata?.location?.label,
        formdata?.headcount,
        formdata?.budget
      );

      const result = await generateTravelPlan(FINAL_PROMPT);
      
      if (!result || typeof result !== "object") {
        throw new Error("Invalid response from AI service");
      }

      toast.success("Travel plan generated successfully");
      await SaveAITrip(result, { ...formdata, totalDays });
      
    } catch (error) {
      console.error("Error generating travel plan:", error);
      toast.error("Failed to generate travel plan");
    } finally {
      setLoading(false);
    }
  };

  const SaveAITrip = async (tripData: Record<string, any>, userSelection: Record<string, any>) => {
    if (!tripData || Object.keys(tripData).length === 0) {
      throw new Error("Invalid trip data");
    }
  
    setLoading(true);
    try {
      const docID = Date.now().toString();
      await setDoc(doc(db, "AITrips", docID), {
        userSelection,
        tripData,
        docID,
        createdAt: new Date().toISOString()
      });
      navigate("/view-trip/" + docID);
    } finally {
      setLoading(false);
    }
  };

  // Optional: Form data logging for debugging
  useEffect(() => {
    console.log("Form data updated:", formdata);
  }, [formdata]);

  return {
    place,
    formdata,
    handleInputChange,
    handleLocationChange,
    OnGenerateTrip,
    loading
  };
};