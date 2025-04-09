import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <img src={assets.logo} className='mb-5 w-32' alt=""/>
            <p className='w-full md:w-2/3 text-grau-600'>
            Thank you for visiting Sarah's Sweets! We're passionate about crafting fresh, homemade treats with love and the finest ingredients. Whether you're craving classic pastries or custom cakes, we’re here to make every moment a little sweeter. Follow us on social media for the latest bakes, specials, and more. We can’t wait to bake for you again!
            </p>
        </div>
        <div>
            <p className='text-xl fond-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'></ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
            
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'></ul>
            <li>+1-817-965-2820</li>
            <li>sgillie@ttu.edu</li>
        </div>

      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025@ Sarah.com - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
