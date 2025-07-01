import React, { use, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { NavLink, Link } from 'react-router-dom'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {

  return (

    <div>
    
      <div className='text-2xl text-center pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='text-gray-600 text-lg'>We're here to help! If you have any questions, concerns, or feedback, please don't hesitate to reach out to our customer support team.</p>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>54709 Williams Station <br /> Suite 350, Washington, USA</p>
          <p className='text-gray-500'>Phone: +1 (555) 123-4567 <br /> Email: trendzide@example.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers At TRENDZIDE</p>
          <p>Learn more about our career opportunities and how you can join our team.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>

      <NewsletterBox />

    </div>
    
  )

}

export default Contact