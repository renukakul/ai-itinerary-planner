import * as  React from 'react'

function CreateTrip() {
  return (
    <div className='sm:px md:px lg:px-56 xl:px-96 2xl:px-96 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preference</h2>
      <p className='text-gray-500 text-[20px]'>
        We will use this information to create a personalized trip for you.
      </p>
      <div className='flex flex-col gap-5 mt-10'>
        <div className='flex flex-col gap-2'>
          <label htmlFor='trip-type' className='text-gray-500 text-[20px]'>Trip Type</label>
          <select id='trip-type' className='border border-gray-300 rounded-md p-2'>
            <option value=''>Select Trip Type</option>
            <option value='business'>Business</option>
            <option value='leisure'>Leisure</option>
            <option value='adventure'>Adventure</option>
          </select>
          </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='trip-destination' className='text-gray-500 text-[20px]'>Trip Destination</label>
          <input type='text' id='trip-destination' className='border border-gray-300 rounded-md p-2' placeholder='Enter your destination' />
          </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='trip-dates' className='text-gray-500 text-[20px]'>Trip Dates</label>
          <input type='date' id='trip-start-date' className='border border-gray-300 rounded-md p-2' />
          <input type='date' id='trip-end-date' className='border border-gray-300 rounded-md p-2' />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor='trip-budget' className='text-gray-500 text-[20px]'>Trip Budget</label>
          <input type='number' id='trip-budget' className='border border-gray-300 rounded-md p-2' placeholder='Enter your budget' />
        </div>
          </div>
    </div>
  )
}

export default CreateTrip;
