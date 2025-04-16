// CreateTrip.tsx
import { useEffect, useState } from "react";
import { SingleValue } from "react-select";
import {
  AI_PROMPT,
  SelectTravelesList,
  TripBudgetList,
} from "@/components/constants/options";
import { Button } from "@/components/ui/button";
import { LocationInput } from "./Location";
import { PlaceOption } from "./types";
import { TripDates } from "./TripDates";
import { TripBudget } from "./Budget";
import { TravelPartyInput } from "./HeadCount";
import { toast } from "sonner";
import { generateTravelPlan } from "@/service/AIModal";

const CreateTrip = () => {
  const [place, setPlace] = useState<SingleValue<PlaceOption>>(null);

  const handleLocationChange = (value: SingleValue<PlaceOption>) => {
    setPlace(value);
    handleInputChange("location", value);
  };
  const [formdata, setFormData] = useState<Record<string, any>>({});

  const handleInputChange = (name: string, value: any) => {
    setFormData({
      ...formdata,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log("formdata", formdata);
  }, [formdata]);
  // This effect will run whenever formdata changes


  const OnGenerateTrip = async () => {
    if (!formdata?.location||!formdata?.startDate || !formdata?.endDate || !formdata?.budget || !formdata?.headcount) {
      toast("Please fill all the fields");
      return;

    }

    const FINAL_PROMPT = AI_PROMPT
    .replace('{location}', formdata?.location?.label)
    .replace('{totalDays}', String((new Date(formdata.endDate).getTime() - new Date(formdata.startDate).getTime()) / (1000 * 3600 * 24)))
    .replace('{headcount}', formdata?.headcount)
    .replace('{budget}', formdata?.budget);
    console.log("FINAL_PROMPT", FINAL_PROMPT);
    
    // Call the API with the FINAL_PROMPT
    
    try{
      const result =await generateTravelPlan(FINAL_PROMPT);
      console.log("travel plan is :", result);
      toast.success("Travel plan generated successfully");
    }catch(error){
      console.error("Error generating travel plan:", error);
      toast.error("Failed to generate travel plan");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-fade-in">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          Plan Your Perfect Trip
        </h2>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          Answer a few questions and we'll craft a personalized itinerary just
          for you
        </p>
      </div>

      <div className="space-y-10">
        {/* Progress Indicator */}
        <div className="bg-gray-100 rounded-full h-2.5">
          <div
            className="bg-gradient-to-r from-orange-400 to-red-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${Object.keys(formdata).length * 25}%` }}
          ></div>
        </div>

        {/* Trip Destination */}
        <LocationInput
          value={place}
          onChange={handleLocationChange}
          className="mb-6" // optional additional styling
        />

        {/* Trip Dates */}
        <TripDates
          startDate={formdata.startDate || ""}
          endDate={formdata.endDate || ""}
          onStartDateChange={(date) => handleInputChange("startDate", date)}
          onEndDateChange={(date) => handleInputChange("endDate", date)}
          className="mb-6" // optional additional styling
        />

        {/* Trip Budget */}
        <TripBudget
          selectedBudget={formdata?.budget}
          onBudgetChange={(budget) => handleInputChange("budget", budget)}
          options={TripBudgetList}
          className="mb-6" // optional additional styling
        />

        {/* Number of Travelers */}
        <TravelPartyInput
          selectedOption={formdata?.headcount}
          onSelectionChange={(people) => handleInputChange("headcount", people)}
          options={SelectTravelesList}
          className="mb-6" // optional additional styling
          title="Who's coming along?"
          description="Select your travel party size"
        />

        {/* Submit Button */}
        <div className="pt-6 flex justify-center">
          <Button
            className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 
              text-white font-bold py-4 px-10 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all
              hover:scale-105 transform duration-300"
            onClick={OnGenerateTrip}
          >
            Create My Trip Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
