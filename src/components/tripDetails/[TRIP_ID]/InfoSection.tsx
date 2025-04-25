import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect } from "react";
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }: { trip: Record<string, any> | null }) {
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
        const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", res.data.places[0].photos[0].name);
        setPhotoUrl(PhotoUrl);
      });
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  return (
    <div className="rounded-lg shadow-md overflow-hidden bg-white border border-gray-100">
      <div className="relative h-64 w-full">
        <img
          src={photoUrl || "/PlaceHolder.jpeg"}
          className="absolute inset-0 h-full w-full object-cover"
          alt={trip?.userSelection?.location?.label || "Travel destination"}
        />
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 gap-4">
        <div className="space-y-2">
          <h2 className="font-bold text-2xl md:text-3xl text-gray-800">
            {trip?.userSelection?.location?.label || "Location not available"}
          </h2>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
              {trip?.userSelection?.totalDays || "N/A"} days
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
              ${trip?.userSelection?.budget || "N/A"}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-50 text-orange-700">
              {trip?.userSelection?.headcount || "N/A"} people
            </span>
          </div>
        </div>
        <Button className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
          <IoIosSend className="text-lg" />
          <span>Share</span>
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;