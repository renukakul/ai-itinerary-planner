import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect } from "react";
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }: { trip: Record<string, any> | null }) {
  console.log("Trip data:", trip);
  console.log("Total days: ", trip?.userSelection?.totalDays);

  const [photoUrl, setPhotoUrl] = React.useState<string | null>(null);

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.userSelection?.location?.label,
      };
      const result = await GetPlaceDetails(data).then((res) => {
        console.log("Place details:", res.data);
        console.log("Place details:", res.data.places[0].photos[2].name);

        const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", res.data.places[0].photos[0].name);
        console.log("Photo URL:", PhotoUrl);
        setPhotoUrl(PhotoUrl);
      });
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  return (
    <div className="rounded-lg shadow-lg overflow-hidden bg-white">
      <div className="relative h-96 w-full">
        <img
          src={photoUrl || "/PlaceHolder.jpeg"}
          className="absolute inset-0 h-full w-full object-cover"
          alt={trip?.userSelection?.location?.label || "Travel destination"}
        />
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 gap-4">
        <div className="space-y-3">
          <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-gray-800">
            {trip?.userSelection?.location?.label || "Location not available"}
          </h2>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
              {trip?.userSelection?.totalDays}{" "}
              {trip?.userSelection?.totalDays === 1 ? "day" : "days"}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {trip?.userSelection?.budget || "Budget not available"}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {trip?.userSelection?.headcount || "Headcount not available"}
            </span>
          </div>
        </div>
        <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors">
          <IoIosSend className="text-lg" />
          <span>Share</span>
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;