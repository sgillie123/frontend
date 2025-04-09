import React from 'react'
import { assets } from '../assets/assets'

const Policy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <img src={assets.exchange} className='w-12 m-auto mb-5' alt="" />
        <p className=' font-semibold'>Easy Extange Policy</p>
        <p className=' text-gray-400'>We offer hassle free extange policy</p>
      </div>
      <div>
        <img src={assets.check} className='w-12 m-auto mb-5' alt="" />
        <p className=' font-semibold'>2 day return policy</p>
        <p className=' text-gray-400'>we give a 2 day return policy</p>
      </div>
      <div>
        <img src={assets.headphones} className='w-12 m-auto mb-5' alt="" />
        <p className=' font-semibold'>Best coustomer support</p>
        <p className=' text-gray-400'>We provide 24/7 coustomer support </p>
      </div>
    </div>
  )
}

export default Policy
