import React, { use, useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';



const Login = () => {

  const [currentState, setCurrentState] = useState('Login')
  const { token,setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', {name,email,password})
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
          toast.success(response.data.message)
          
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', {email,password})
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token',response.data.token)
          toast.success('Login successful!')
          
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
        console.log(error)
        toast.error(error.response?.data?.message || error.message || 'Something went wrong')
    }
  }

  useEffect(()=>{
    if (token){
      navigate('/')
    }
  },[token])

  return (

    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>

      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p  className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currentState === 'Login' ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />}
      <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />

      <div className='w-full flex justify-between text-smmt-[-8px]'>
        <p className='cursor-pointer'>Forgot Your Password</p>
        {
          currentState === 'Login'
          ? <p className='cursor-pointer' onClick={() => setCurrentState('Sign Up')}>Create Account</p>
          : <p className='cursor-pointer' onClick={() => setCurrentState('Login')}>Already have an Account</p>
        }
      </div>

      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>

    </form>

  )

}

export default Login