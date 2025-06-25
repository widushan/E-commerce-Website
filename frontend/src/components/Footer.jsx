import React from 'react'
import { assets } from '../assets/assets'



const Footer = () => {

  return (

    <div>

        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

            <div>
                <img src={assets.mylogo} className='mb-2 w-32' alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>
                    We’re dedicated to delivering the best in quality, style, and value. 
                    At TRENDZIDE, we offer products that suit every taste and lifestyle. 
                    We believe in providing exceptional service and personalized attention to our valued customers. 
                    Thank you for choosing us — your trust drives everything we do.
                </p>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Address: 123 Main St, City, Country</li>
                    <li>Phone: +1 123-456-7890</li>
                    <li>Email: test7788@example.com</li>
                </ul>
            </div>

        </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright © 2025 TRENDZIDE. |   All rights reserved.</p>   
        </div>

    </div>
  )
  
}

export default Footer