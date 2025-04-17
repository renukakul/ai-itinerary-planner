import { SingleValue } from 'react-select';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { FiMapPin } from 'react-icons/fi';
import { PlaceOption, LocationInputProps } from '../../hooks/types';

export const LocationInput = ({ 
  value, 
  onChange,
  className = ''
}: LocationInputProps) => {
  return (
    <div className={`bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-red-100 rounded-lg text-red-500">
          <FiMapPin className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-800">Where are you going?</h3>
      </div>
      <GooglePlacesAutocomplete
        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
        selectProps={{
          value,
          onChange,
          placeholder: "Search destinations...",
          className: "w-full",
          styles: {
            control: (provided) => ({
              ...provided,
              minHeight: '56px',
              borderRadius: '12px',
              borderColor: '#e5e7eb',
              boxShadow: 'none',
              '&:hover': {
                borderColor: '#d1d5db'
              },
              fontSize: '1rem'
            }),
            input: (provided) => ({
              ...provided,
              padding: '12px'
            }),
            placeholder: (provided) => ({
              ...provided,
              color: '#9ca3af'
            })
          }
        }}
      />
    </div>
  );
};