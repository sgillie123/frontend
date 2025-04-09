import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets' 
import { NavLink, Link } from 'react-router-dom' 
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisable] = useState(false);
  const {setShowSearch, getCartCount, navigate} = useContext(ShopContext)

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to= '/'><img src={assets.logo} className='w-36' alt="Logo" /></Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>

        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>

      {/* Dropdown menu for account */}
      <div className='flex items-center gap-6'>
        <img onClick={()=>setShowSearch(true)} src={assets.search} className='w-5 cursor-pointer' alt="Search" />
        
        <div className='group relative'>
          <Link to='/login'><img className='w-8 cursor-pointer' src={assets.profile} alt="User Profile" /></Link>
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
              <p className='cursor-pointer hover:text-black'>My Profile</p> 
              <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
              <p className='cursor-pointer hover:text-black'>Logout</p> 
            </div>
          </div>
        </div>
       
        <Link to='/cart' className='relative'>
          <img src={assets.cart} className='w-8 min-w-5' alt="Shopping Cart" />
          <p  className='absolute right-3 bottom-4 w-5 text-center leading-5 bg-black text-white h-5 rounded-full text-xs'>
          {getCartCount()}</p>
        </Link>
        <img onClick={()=>setVisable(true)} src={assets.menu} className='w-5 cursor-pointer sm:hidden' alt="" />
      </div>
      
      {/* sidebar menu for a small screen */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className= 'flex flex-col text-gray-600'>
          <div onClick={()=>setVisable(false)} className= 'flex items-center gap-4 p-3'>
            <img className= 'h-4 rotate 180 py-3 pl-6 border' src={assets.dropdown} alt=""></img>
            <p className={'cursor-pointer hover:text-white absolute left-[12px] top-[10px] w-10 text-center leading-10 bg-black text-white aspect-square rounded-full text-[14px]'}>Back</p>
          </div>
          <NavLink onClick = {()=>setVisable(false)} className= 'py-3 pl-6 border' to= '/'>HOME</NavLink>
          <NavLink onClick = {()=>setVisable(false)} className= 'py-3 pl-6 border' to= '/collection'>COLLECTION</NavLink>
          <NavLink onClick = {()=>setVisable(false)} className= 'py-3 pl-6 border' to= '/about'>ABOUT</NavLink>
          <NavLink onClick = {()=>setVisable(false)} className= 'py-3 pl-6 border' to= '/contact'>CONTACT</NavLink>

        </div>

      </div>

  
      
    </div>
  )
}
// const addToCart = async (itemId, size) => {
//   console.log('Adding to cart:', { itemId, size });
//   // rest of your code
// }


export default Navbar
