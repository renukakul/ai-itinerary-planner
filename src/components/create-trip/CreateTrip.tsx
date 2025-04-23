import { Button } from "@/components/ui/button";
import { LocationInput } from "./Location";
import { TripDates } from "./TripDates";
import { TripBudget } from "./Budget";
import { TravelPartyInput } from "./HeadCount";
import { TripBudgetList, SelectTravelesList } from "@/components/constants/options";
import { useCreateTripForm } from "../../hooks/useCreateTripForm";
import { useAuth } from "@/hooks/useAuth";
import { LoginDialog } from "@/components/Dialog/LoginDialog";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CreateTrip = () => {
  const {
    place,
    formdata,
    handleInputChange,
    handleLocationChange,
    OnGenerateTrip,
    loading,
  } = useCreateTripForm();

  const { 
    authUser, 
    isAuthDialogOpen, 
    setIsAuthDialogOpen,
    login 
  } = useAuth();

  const handleTripGeneration = async () => {
    if (!authUser) {
      setIsAuthDialogOpen(true);
      return;
    }
    await OnGenerateTrip();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          Plan Your Perfect Trip
        </h2>
        <p className="mt-4 text-xl text-gray-600">
          Answer a few questions and we'll craft a personalized itinerary just for you
        </p>
      </div>

      <div className="space-y-10">
        <div className="bg-gray-100 rounded-full h-2.5">
          <div
            className="bg-gradient-to-r from-orange-400 to-red-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${Object.keys(formdata).length * 25}%` }}
          ></div>
        </div>

        <LocationInput value={place} onChange={handleLocationChange} />
        <TripDates
          startDate={formdata.startDate || ""}
          endDate={formdata.endDate || ""}
          onStartDateChange={(date) => handleInputChange("startDate", date)}
          onEndDateChange={(date) => handleInputChange("endDate", date)}
        />
        <TripBudget
          selectedBudget={formdata?.budget}
          onBudgetChange={(budget) => handleInputChange("budget", budget)}
          options={TripBudgetList}
        />
        <TravelPartyInput
          selectedOption={formdata?.headcount}
          onSelectionChange={(people) => handleInputChange("headcount", people)}
          options={SelectTravelesList}
          title="Who's coming along?"
          description="Select your travel party size"
        />
        <div className="pt-6 flex justify-center">
          <Button 
            disabled={loading}
            onClick={handleTripGeneration} 
            className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-10 py-4 rounded-xl text-lg shadow-lg hover:scale-105 transition-all"
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              'Create My Trip Plan'
            )}
          </Button>
        </div>
      </div>

      <LoginDialog 
        open={isAuthDialogOpen} 
        onOpenChange={setIsAuthDialogOpen} 
        login={login} 
      />
    </div>
  );
};

export default CreateTrip;