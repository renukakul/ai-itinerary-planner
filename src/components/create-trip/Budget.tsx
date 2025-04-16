import { FiDollarSign } from "react-icons/fi";

interface BudgetOption {
  name: string;
  icons: React.ReactNode;
  desc: string;
}

interface TripBudgetProps {
  selectedBudget: string | undefined;
  onBudgetChange: (budget: string) => void;
  options: BudgetOption[];
  className?: string;
}

export const TripBudget = ({
  selectedBudget,
  onBudgetChange,
  options,
  className = "",
}: TripBudgetProps) => {
  return (
    <div className={`bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-green-100 rounded-lg text-green-500">
          <FiDollarSign className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-800">What's your budget?</h3>
      </div>
      
      <p className="text-gray-500 mb-6">
        Select the option that best fits your travel style
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {options.map((item, index) => (
          <div
            key={index}
            onClick={() => onBudgetChange(item.name)}
            className={`p-5 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
              selectedBudget === item.name
                ? "border-red-400 bg-gradient-to-br from-red-50 to-white shadow-lg ring-2 ring-red-200"
                : "border-gray-200 hover:border-gray-300 hover:shadow-md"
            }`}
          >
            <div className="text-4xl mb-3 text-red-500">{item.icons}</div>
            <h3 className="font-bold text-xl text-gray-800">{item.name}</h3>
            <p className="text-gray-600 mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};