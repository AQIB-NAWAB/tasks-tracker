import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div>
        <nav className='flex w-100  justify-center items-center h-40 bg-black'>
            <Image src="/images/logo.png" alt="logo" width={200} height={200} />
        </nav>
        
    </div>
  )
}

export default Header