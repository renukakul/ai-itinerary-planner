import * as React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className='relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-24 lg:py-32 max-w-7xl mx-auto gap-6 md:gap-8 overflow-hidden'>
      {/* Enhanced Animated Logo */}
      <div className="w-72 md:w-96 lg:w-[500px] mb-8 relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/40 to-red-500/40 rounded-full blur-2xl scale-110 group-hover:scale-125 group-hover:opacity-80 transition-all duration-1000 -z-10"></div>
        
        <img 
          src="/file.svg"
          alt="WanderWise Logo" 
          className="w-full h-auto transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform group-hover:scale-105 group-hover:-translate-y-2 drop-shadow-2xl hover:drop-shadow-[0_25px_25px_rgba(239,68,68,0.25)]"
        />
        
        {/* Pulsing ring effect */}
        <div className="absolute inset-0 border-4 border-orange-400/30 rounded-lg scale-105 group-hover:scale-110 group-hover:opacity-0 transition-all duration-1000 -z-20 animate-pulse-slow"></div>
      </div>
      
      {/* Headings with more dramatic entrance */}
      <h1 className='font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-center leading-tight md:leading-snug animate-fade-in-up'>
        <span className='bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 bg-clip-text text-transparent'>
          Discover Your Next Adventure
        </span>
      </h1>
      
      <p className='text-center text-gray-600 text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-100'>
        Your ultimate travel companion for personalized trip planning and unforgettable experiences.
      </p>
      
      {/* Enhanced Button with floating effect */}
      <Link to='/create-trip' className='mt-6 md:mt-8 animate-fade-in-up delay-200'>    
        <Button className='relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-full px-10 py-7 text-xl transition-all duration-500 ease-out hover:scale-105 shadow-2xl hover:shadow-[0_20px_50px_rgba(239,68,68,0.3)] hover:-translate-y-1'>
          <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
          Get Started, It's Free
          <span className="absolute inset-0 border-2 border-white/20 rounded-full scale-105 opacity-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"></span>
        </Button>
      </Link>
      
      {/* Background animation elements */}
      <div className="absolute -left-40 top-1/4 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl -z-30 animate-float-slow"></div>
      <div className="absolute -right-40 bottom-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl -z-30 animate-float-delay"></div>
      <div className="absolute left-1/4 bottom-1/3 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl -z-30 animate-float"></div>
    </div>
  )
}

export default Hero;