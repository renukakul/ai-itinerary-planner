import * as  React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1
        className='font-extrabold text-[50px] text-center mt-16'>
            <span className='text-[#f56551]'>
            Discover Your Next Adventure with WanderWise
            </span>
        </h1>
        <p className='text-center text-gray-500 text-[20px]'>
            Your ultimate travel companion for personalized trip planning and unforgettable experiences.
        </p>
        <Link to='/create-trip'>    
            <Button
                className='bg-[#f56551] text-white rounded-full px-6 py-3 hover:bg-[#f56551]/80 transition duration-200 ease-in-out'>
                    Get Started, It's Free
            </Button>
        </Link>
    </div>
  )
}

export default Hero
