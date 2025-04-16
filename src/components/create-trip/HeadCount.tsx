import { FiUsers } from "react-icons/fi";

interface TravelerOption {
  people: string;
  icon: React.ReactNode;
  name: string;
  desc: string;
}

interface TravelPartyInputProps {
  selectedOption: string | undefined;
  onSelectionChange: (people: string) => void;
  options: TravelerOption[];
  className?: string;
  title?: string;
  description?: string;
}

export const TravelPartyInput = ({
  selectedOption,
  onSelectionChange,
  options,
  className = "",
  title = "Who's coming along?",
  description = "Select your travel party size",
}: TravelPartyInputProps) => {
  return (
    <div className={`bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-100 rounded-lg text-purple-500">
          <FiUsers className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
      </div>
      
      <p className="text-gray-500 mb-6">{description}</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {options.map((item, index) => (
          <div
            key={index}
            onClick={() => onSelectionChange(item.people)}
            className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
              selectedOption === item.people
                ? "border-red-400 bg-gradient-to-br from-red-50 to-white shadow-lg ring-2 ring-red-200"
                : "border-gray-200 hover:border-gray-300 hover:shadow-md"
            }`}
          >
            <div className="text-4xl mb-3 text-red-500">{item.icon}</div>
            <h3 className="font-bold text-xl text-gray-800">{item.name}</h3>
            <p className="text-gray-600 mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};