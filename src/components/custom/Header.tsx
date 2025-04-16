import * as React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <div className="w-full border-b border-gray-100 bg-white px-4 py-3 shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {/* Logo with improved styling */}
        <div className="flex items-center">
          <img 
            src="/logo.svg" 
            alt="WanderWise" 
            className="h-9 w-auto transition-all hover:opacity-80"
            width={140}
            height={36}
          />
          <span className="ml-2 hidden text-xl font-semibold text-gray-800 sm:block">
            Wander<span className="text-red-500">Wise</span>
          </span>
        </div>

        {/* Sign Up Button */}
        <Button 
          className="bg-red-500 px-5 py-2 text-white hover:bg-red-600 hover:shadow-md"
        >
          Sign Up
        </Button>
      </div>
    </div>
  )
}

export default Header