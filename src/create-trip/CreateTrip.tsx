import { on } from 'events';
import * as React from 'react';
import { useState } from 'react';
import { SingleValue } from 'react-select';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const CreateTrip: React.FC = () => {
  // Define the type for the place option
  // This type should match the structure of the data returned by Google Places API  
  type PlaceOption = {
    label: string;
    value: string;
  };
  
  const [place, setPlace] = useState<SingleValue<PlaceOption>>(null);
  return (
    <div className='sm:px md:px lg:px-56 xl:px-96 2xl:px-96 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preference</h2>
      <p className='text-gray-500 text-[20px]'>
        We will use this information to create a personalized trip for you.
      </p>
      <div className='flex flex-col gap-5 mt-10'>
        {/* Trip Type */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='trip-type' className='text-gray-500 text-[20px]'>Trip Type</label>
          <select id='trip-type' className='border border-gray-300 rounded-md p-2'>
            <option value=''>Select Trip Type</option>
            <option value='business'>Business</option>
            <option value='leisure'>Leisure</option>
            <option value='adventure'>Adventure</option>
          </select>
        </div>

        {/* Trip Destination */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='trip-destination' className='text-gray-500 text-[20px]'>Trip Destination</label>
            <GooglePlacesAutocomplete 
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY} // Type assertion for the API key
            selectProps={{
              value: place,
              onChange: (v) => { setPlace(v); console.log(v); },
            }}
            />
          
        </div>

        {/* Trip Dates */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='trip-dates' className='text-gray-500 text-[20px]'>Trip Dates</label>
          <input 
            type='date' 
            id='trip-start-date' 
            className='border border-gray-300 rounded-md p-2' 
          />
          <input 
            type='date' 
            id='trip-end-date' 
            className='border border-gray-300 rounded-md p-2' 
          />
        </div>

        {/* Trip Budget */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='trip-budget' className='text-gray-500 text-[20px]'>Trip Budget</label>
          <input 
            type='number' 
            id='trip-budget' 
            className='border border-gray-300 rounded-md p-2' 
            placeholder='Enter your budget' 
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;