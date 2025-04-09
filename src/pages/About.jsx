import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newsletter from '../components/Newsletter'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-fulll md:max-w-[450px]' src={assets.about} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Welcome to Sarah Sweets, your go-to destination for freshly baked delights that bring a little extra joy to every moment. At Sarah Sweets, we believe that every bite should be as sweet as the memories it helps create. Whether you're craving gooey cookies, fluffy cupcakes, or beautifully crafted cakes, our treats are baked with love and the finest ingredients to ensure rich flavors and delightful textures. From everyday indulgences to special occasions, we’ve got something to satisfy every sweet tooth.</p>
        <p>Founded by Sarah, a lifelong baking enthusiast with a passion for creating smiles through sweets, our bakery is built on quality, creativity, and a love for sharing homemade goodness. Each recipe is made from scratch, with attention to detail and a sprinkle of charm. Whether you're ordering a dozen cupcakes for a party or just treating yourself to a cookie (or two!), we're here to make your day a little sweeter. Thanks for stopping by—we can’t wait to bake something special just for you!</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Our mission is to spread happiness through handcrafted, high-quality baked goods made with love and care. We’re dedicated to creating delicious treats that bring people together, celebrate life’s sweet moments, and turn everyday cravings into unforgettable experiences.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
        <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance: </b>
            <p className='text-gray-600'>At Sarah Sweets, we never compromise on quality. Every cookie, cupcake, and cake is made from scratch using premium ingredients, ensuring freshness and flavor in every bite. We take pride in our consistent baking standards so you can enjoy treats that taste just as amazing every single time.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convienence: </b>
            <p className='text-gray-600'>We make it easy to satisfy your sweet tooth. With a user-friendly online shop, flexible pickup options, and timely delivery, getting your favorite treats has never been simpler. Whether you're planning ahead or need a last-minute dessert, Sarah Sweets is here to make your life a little sweeter—right when you need it.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional customer Service: </b>
            <p className='text-gray-600'>Your happiness is at the heart of everything we do. From personalized orders to quick responses, we go the extra mile to make sure you feel valued and taken care of. We love connecting with our customers and making sure your experience with Sarah Sweets is just as delightful as our desserts.</p>
          </div>
        </div>

        < Newsletter/>

      </div>     
    </div>
  )
}

export default About
