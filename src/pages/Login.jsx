import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const { backendURL, setToken, setUser } = useContext(ShopContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      const endpoint = currentState === 'Login' ? '/login' : '/register'
      const response = await axios.post(`${backendURL}/api/user${endpoint}`, formData)
      
      if (response.data.success) {
        setToken(response.data.token)
        setUser(response.data.user)
        toast.success(currentState === 'Login' ? 'Login successful!' : 'Registration successful!')
        navigate('/')
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || 'An error occurred')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='lobster-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 by-gray-800' />
      </div>
      {currentState === 'Login' ? '' : (
        <input 
          type="text" 
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className='w-full px-3 py-2 border border-gray-800' 
          placeholder='Name' 
          required 
        />
      )}
      <input 
        type="email" 
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        className='w-full px-3 py-2 border border-gray-800' 
        placeholder='Email' 
        required 
      />
      <input 
        type="password" 
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        className='w-full px-3 py-2 border border-gray-800' 
        placeholder='Password' 
        required
      />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {
          currentState === 'Login'
          ? <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
          : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login
