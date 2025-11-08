import React from 'react'
import { Button } from '@/components/ui/button'

function Header() {
  return (
    <div className=' shadow-md flex justify-between items-center'>
      <img src="/logo.png" alt="Logo" className="h-25 w-25" />
      <div>
        <Button/>
      </div>
    </div>
  )
}

export default Header
