import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'


const Navbar = () => {
  return (
    <div>
        <img className='w-[max(10%,80px)]' src={assets.logo_admin} alt="" />
        <button className='bg-red text-black px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar