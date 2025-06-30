import React, { use, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { NavLink, Link } from 'react-router-dom'
import Title from '../components/Title'




const About = () => {

  return (

    <div>

      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:ax-w-[450px]' src={assets.about_img} alt="" />
      </div>

    </div>

  )

}

export default About