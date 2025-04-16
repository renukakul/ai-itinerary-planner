import { on } from 'events';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { SingleValue } from 'react-select';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from '@/components/ui/input';
import { SelectTravelesList, TripBudgetList } from '@/components/constants/options';
import { Button } from '@/components/ui/button';

const CreateTrip: React.FC = () => {
  // Define the type for the place option
  // This type should match the structure of the data returned by Google Places API  
  type PlaceOption = {
    label: string;
    value: string;
  };
  
  const [place, setPlace] = useState<SingleValue<PlaceOption>>(null);

  const [formdata, setFormData] = useState<Record<string, any>>({});
  
  const handleInputChange = (name: string, value: any) => {
    setFormData({
      ...formdata,
      [name]: value,
    });
    console.log('formdata', formdata);
  }
  useEffect(() => {
    console.log('formdata', formdata);
  }, [formdata]);
  // This effect will run whenever formdata changes
  
  
  return (
    <div className='sm:px md:px lg:px-56 xl:px-96 2xl:px-96 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preference</h2>
      <p className='text-gray-500 text-[20px]'>
        We will use this information to create a personalized trip for you.
      </p>
      {/* Trip Destination */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='trip-destination' className='text-gray-500 text-[20px]'>Trip Destination</label>
            <GooglePlacesAutocomplete 
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY} // Type assertion for the API key
            selectProps={{
              value: place,
              onChange: (v) => { setPlace(v); console.log(v); 
                handleInputChange('location',v);
                console.log(formdata);
                console.log('location',v);},
            }}
            />
          
        </div>

        {/* Trip Dates */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='trip-dates' className='text-gray-500 text-[20px]'>Trip Dates</label>
          <Input
            type='date' 
            id='trip-start-date' 
            className='border border-gray-300 rounded-md p-2' 
          />
          <Input
            type='date' 
            id='trip-end-date' 
            className='border border-gray-300 rounded-md p-2' 
          />
        </div>

        {/* Trip Budget */}
        <div>
        <div className='text-xl my-3 font-medium'>
          <label htmlFor='trip-budget' className='text-gray-500 text-[20px]'>Trip Budget</label>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {TripBudgetList.map(((item, index) => (
              <div key={index} className='p-4 border rounded-xl  hover:shadow-lg cursor-pointer '>
                <h2 className='text-3xl'>{item.icons}</h2>
                <h2 className='font-bold text-xl'>{item.name}</h2>
                <p className='text-gray-500'>{item.desc}</p>
          </div>
            )))}
        </div>
      </div>
      </div>
      <div>
      <div className='text-xl my-3 font-medium'>
          <label htmlFor='trip-budget' className='text-gray-500 text-[20px]'>Head count</label>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelesList.map(((item, index) => (
              <div key={index} className='p-4 border rounded-xl  hover:shadow-lg cursor-pointer '>
                <h2 className='text-3xl'>{item.icon}</h2>
                <h2 className='font-bold text-xl'>{item.name}</h2>
                <p className='text-gray-500'>{item.desc}</p>
          </div>
            )))}
    </div>
    </div>
    </div>
    

    <div className='my-10 justify-end flex'>
      <Button>My Trip Plan</Button>
    </div>
    </div>

  );
};

export default CreateTrip;