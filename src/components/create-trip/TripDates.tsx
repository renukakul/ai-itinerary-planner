import { FiCalendar } from "react-icons/fi";
import { Input } from "@/components/ui/input";

interface TripDatesProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  className?: string;
}

export const TripDates = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  className = "",
}: TripDatesProps) => {
  const calculateDays = (start: string, end: string): number => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.ceil(
      Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  return (
    <div className={`bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg text-blue-500">
          <FiCalendar className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-800">When are you traveling?</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-500">Start Date</label>
          <Input
            type="date"
            value={startDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="w-full h-14 px-4 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-red-400 text-gray-700"
            onKeyDown={(e) => e.preventDefault()}
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-500">End Date</label>
          <Input
            type="date"
            value={endDate}
            min={startDate || new Date().toISOString().split("T")[0]}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="w-full h-14 px-4 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-red-400 text-gray-700"
            disabled={!startDate}
            onKeyDown={(e) => e.preventDefault()}
          />
        </div>
      </div>

      {startDate && endDate && (
        <div className="mt-4 p-3 bg-red-50 rounded-lg inline-block animate-fade-in">
          <p className="text-lg font-medium text-red-500 flex items-center gap-2">
            <FiCalendar className="text-red-400" />
            {calculateDays(startDate, endDate)} days of adventure!
          </p>
        </div>
      )}
    </div>
  );
};