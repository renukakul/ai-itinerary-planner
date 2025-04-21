import { useEffect, useState } from "react";
import { SingleValue } from "react-select";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { AI_PROMPT } from "@/components/constants/options";
import { generateTravelPlan } from "@/service/AIModal";
import { PlaceOption } from "./types";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/FirebaseConfig";
import { useNavigate } from "react-router-dom";

export const useCreateTripForm = () => {
  const [formdata, setFormData] = useState<Record<string, any>>({});
  const [place, setPlace] = useState<SingleValue<PlaceOption>>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (value: SingleValue<PlaceOption>) => {
    setPlace(value);
    handleInputChange("location", value);
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile= (tokenInfo: { access_token: any; }) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json',
      },

  }).then((response) => {
    console.log("User profile data:", response.data);
    localStorage.setItem("user", JSON.stringify(response.data));
    setOpenDialog(false);
    toast.success("Login successful");
    OnGenerateTrip();
    });
  }

  const OnGenerateTrip = async () => {
    if (!formdata?.location || !formdata?.startDate || !formdata?.endDate || !formdata?.budget || !formdata?.headcount) {
      toast("Please fill all the fields");
      return;
    }
  
    setLoading(true);
  
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
  
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formdata?.location?.label)
      .replace(
        "{totalDays}",
        String((new Date(formdata.endDate).getTime() - new Date(formdata.startDate).getTime()) / (1000 * 3600 * 24))
      )
      .replace("{headcount}", formdata?.headcount)
      .replace("{budget}", formdata?.budget);
  
    try {
      const result = await generateTravelPlan(FINAL_PROMPT);
  
      if (!result || typeof result !== "object") {
        throw new Error("Invalid response from AI service");
      }
  
      console.log("Travel plan is:", result);
      toast.success("Travel plan generated successfully");
  
      // Pass the valid result to SaveAITrip
      await SaveAITrip(result);
    } catch (error) {
      console.error("Error generating travel plan:", error);
      toast.error("Failed to generate travel plan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("formdata", formdata);
  }, [formdata]);

const SaveAITrip = async (TripData: Record<string, any>) => {
    if (!TripData || Object.keys(TripData).length === 0) {
      console.error("Invalid trip data:", TripData);
      throw new Error("Invalid trip data");
    }
  
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const docID = Date.now().toString();
  
    await setDoc(doc(db, "AITrips", docID), {
      userSelection: formdata,
      tripData: TripData,
      userEmail: user?.email,
      docID: docID,
    });
  
    setLoading(false);
  
    navigate("/view-trip/" + docID);
  };

  return {
    place,
    formdata,
    openDialog,
    login,
    setOpenDialog,
    handleInputChange,
    handleLocationChange,
    OnGenerateTrip,
    SaveAITrip, // Include SaveAITrip in the return object
    GetUserProfile, // Include GetUserProfile in the return object
    loading,
    setLoading,
  };
  };
