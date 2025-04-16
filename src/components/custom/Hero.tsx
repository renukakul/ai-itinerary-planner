import * as React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-24 lg:py-32 max-w-7xl mx-auto gap-6 md:gap-8'>
      <h1 className='font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center leading-tight md:leading-snug'>
        <span className='bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent'>
          Discover Your Next Adventure with WanderWise
        </span>
      </h1>
      <p className='text-center text-gray-600 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed'>
        Your ultimate travel companion for personalized trip planning and unforgettable experiences.
      </p>
      <Link to='/create-trip' className='mt-4 md:mt-6'>    
        <Button
          className='bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-full px-8 py-6 text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl'>
          Get Started, It's Free
        </Button>
      </Link>
    </div>
  )
}

export default Hero