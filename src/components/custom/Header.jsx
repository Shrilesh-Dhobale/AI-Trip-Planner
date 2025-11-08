import React from 'react'
import { Button } from '@/components/ui/button'

function Header() {
  return (
    <div className='p-2 shadow-md flex justify-between items-center bg-red-200'>
      <img src="/logo.png" alt="Logo" className="h-4 w-4" />
      <div>
        <Button/>
      </div>
    </div>
  )
}

export default Header
