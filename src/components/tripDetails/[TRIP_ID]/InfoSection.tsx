import { Button } from "@/components/ui/button";
import React from "react";
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }: { trip: Record<string, any> | null }) {
  console.log("Trip data:", trip);
  console.log("Total days: ", trip?.tripData?.totalDays);
  return (
    <div>
      <img
        src="/PlaceHolder.jpeg"
        className="h-[500px] w-full object-cover rounded"
      />
      <div className="flex justify-between items-center bg-white p-5 rounded-b">
            <div className="my-5 flex flex-col gap-2">
                <h2 className="font-bold text-5xl">
                {trip?.userSelection?.location?.label || "Location not available"}
                </h2>
                <div className="flex gap-5 flex-wrap">
                <h2 className="p-1 px-3 bg-red-100 text-red-500 rounded-full "> 
                    {trip?.tripData?.totalDays}{" "}
                    {trip?.tripData?.totalDays === 1 ? "day" : "days"}
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
