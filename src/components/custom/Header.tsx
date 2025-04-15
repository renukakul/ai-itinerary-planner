import * as React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <div className='flex justify-between items-center p-4 bg-white shadow-md'>
        <img src='/logo.svg' alt='WandeWise' />
        <div>
            <Button> Sign Up</Button>        
        </div>
    </div>
  )
}

export default Header
