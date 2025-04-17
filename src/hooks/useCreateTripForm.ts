import { useEffect, useState } from "react";
import { SingleValue } from "react-select";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { AI_PROMPT } from "@/components/constants/options";
import { generateTravelPlan } from "@/service/AIModal";
import { PlaceOption } from "./types";
import axios from "axios";

export const useCreateTripForm = () => {
  const [formdata, setFormData] = useState<Record<string, any>>({});
  const [place, setPlace] = useState<SingleValue<PlaceOption>>(null);
  const [openDialog, setOpenDialog] = useState(false);

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

    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formdata?.location?.label)
      .replace("{totalDays}", String((new Date(formdata.endDate).getTime() - new Date(formdata.startDate).getTime()) / (1000 * 3600 * 24)))
      .replace("{headcount}", formdata?.headcount)
      .replace("{budget}", formdata?.budget);

    try {
      const result = await generateTravelPlan(FINAL_PROMPT);
      console.log("travel plan is :", result);
      toast.success("Travel plan generated successfully");
    } catch (error) {
      console.error("Error generating travel plan:", error);
      toast.error("Failed to generate travel plan");
    }
  };

  useEffect(() => {
    console.log("formdata", formdata);
  }, [formdata]);

  return {
    place,
    formdata,
    openDialog,
    login,
    setOpenDialog,
    handleInputChange,
    handleLocationChange,
    OnGenerateTrip,
  };
};
