import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newsletter from '../components/Newsletter'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibolt text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>Texas Tech University <br /> Lubbock, Texas, USA</p>
          <p className='text-gray-500'>Tel: (817) 965-2820 <br /> Email: Sgillie@ttu.edu</p>
          <p className='text-gray-500'>Careers at Sarah's Sweets</p>
          <p className='text-gray-500'>Learn more about out teams and job openings</p>
          <button className='border border-black px-8 py-4 text:sm hover:bg-black hover:text-white transition:all duration:500'>Explore Jobs</button>
        </div>
      </div>
      <Newsletter />
    </div>
  )
}

export default Contact
