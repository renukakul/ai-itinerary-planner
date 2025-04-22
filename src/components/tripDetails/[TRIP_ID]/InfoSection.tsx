import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect } from "react";
import { IoIosSend } from "react-icons/io";



function InfoSection({ trip }: { trip: Record<string, any> | null }) {
  console.log("Trip data:", trip);
  console.log("Total days: ", trip?.userSelection?.totalDays);

  const[photoUrl,setPhotoUrl]=React.useState<string | null>(null);


  useEffect(() => {
    
      trip&&GetPlacePhoto();
  }, [trip]);
  

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.userSelection?.location?.label,
      };
      const result = await GetPlaceDetails(data).then((res) => {
        console.log("Place details:", res.data);
        console.log("Place details:", res.data.places[0].photos[2].name);

        const PhotoUrl=PHOTO_REF_URL.replace("{NAME}",res.data.places[0].photos[0].name);
        console.log("Photo URL:", PhotoUrl);
        setPhotoUrl( PhotoUrl);
      });
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };
  
  return (
    <div>
      <img
        src={photoUrl||"/PlaceHolder.jpeg"}
        className="h-[500px] w-full object-cover rounded"
      />
      <div className="flex justify-between items-center bg-white p-5 rounded-b">
            <div className="my-5 flex flex-col gap-2">
                <h2 className="font-bold text-5xl">
                {trip?.userSelection?.location?.label || "Location not available"}
                </h2>
                <div className="flex gap-5 flex-wrap">
                <h2 className="p-1 px-3 bg-red-100 text-red-500 rounded-full "> 
                {trip?.userSelection?.totalDays}{" "}
{trip?.userSelection?.totalDays === 1 ? "day" : "days"}

                </h2>
                <h2 className="p-1 px-3 bg-green-100 text-green-500 rounded-full">
                    {trip?.userSelection?.budget || "Budget not available"}
                </h2>
                <h2 className="p-1 px-3 bg-blue-100 text-blue-500 rounded-full">
                    {trip?.userSelection?.headcount || "Headcount not available"}
                </h2>
                </div>
            </div>
            <Button><IoIosSend/></Button>
        </div>
    </div>
  );
}

export default InfoSection;
// Removed duplicate function implementation
