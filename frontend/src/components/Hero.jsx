import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {

  return (

    <div className='flex flex-col sm:flex-row border border-gray-400'>
        
        {/*Hero Left Side*/}
        <div className="w-full sm:w-1/2 flex items-center justify-center py-16 sm:py-0">

            <div className="text-[#222] bg-white/80 rounded-lg p-8 shadow-lg max-w-xl">
                <div className="flex items-center gap-3 mb-10">
                    <span className="w-10 h-[2px] bg-indigo-500 rounded"></span>
                    <span className="font-semibold text-indigo-600 text-4xl tracking-wide">Welcome !</span>
                    <span className="w-10 h-[2px] bg-indigo-500 rounded"></span>
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-10">
                    Elevate Your Style <br /> 
                    <span className="text-indigo-500">With Our Latest Arrivals</span>
                </h1>
                <p className="text-lg text-gray-700 mb-10 font-medium">
                    Discover handpicked fashion essentials designed for comfort, style, and confidence. <br />
                    <span className="text-indigo-500 font-semibold mb-10">Exclusive designs. Limited stock.</span>
                </p>
                <p className="text-md text-gray-600 font-semibold mt-10">
                    # Shopping with <span className="text-indigo-600">TRENDZIDE</span>
                </p>
                <hr className="my-6 border-indigo-300" />
                <img src={assets.mylogo} alt="Business Logo" className="mx-auto w-32 h-auto" />
            </div>

        </div>
        

        {/*Hero Right Side*/}
        <img className='w-full sm:w-1/2 h-100' src={assets.bg_hero} alt="" />

    </div>

  )

}

export default Hero