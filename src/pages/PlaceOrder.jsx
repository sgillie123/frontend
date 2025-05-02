import React, { useContext, useState, useEffect } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, requireAuth, user, backendURL, token, cartItems, products, delivery_fee, setCartItems } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  useEffect(() => {
    if (!requireAuth()) return;

    // Pre-fill form with user data if available
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        street: user.address?.street || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
        zipcode: user.address?.zipcode || '',
        country: user.address?.country || '',
        phone: user.phone || ''
      });
    }
  }, [user, requireAuth]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = async () => {
    if (!requireAuth()) return;

    try {
      // Validate user is logged in and has an ID
      if (!user?._id) {
        toast.error('Please log in to continue');
        navigate('/login');
        return;
      }

      // Validate form data
      if (!formData.street || !formData.city || !formData.state || !formData.country || !formData.zipcode) {
        toast.error('Please fill in all address fields');
        return;
      }

      // Calculate total amount and prepare items
      let totalAmount = 0;
      const items = [];
      
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          const quantity = cartItems[itemId][size];
          const product = products.find(p => p._id === itemId);
          if (product) {
            const price = product.price;
            totalAmount += price * quantity;
            items.push({
              _id: product._id,
              name: product.name,
              price: price,
              quantity: quantity,
              size: size,
              image: product.image
            });
          }
        }
      }

      // Validate cart is not empty
      if (items.length === 0) {
        toast.error('Your cart is empty');
        return;
      }

      // Add delivery fee
      totalAmount += delivery_fee;

      // Prepare order data
      const orderData = {
        userId: user._id,
        items: items,
        amount: totalAmount,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          zipcode: formData.zipcode
        },
        paymentMethod: method
      };

      console.log('Sending order data:', orderData); // Debug log

      let response;
      if (method === 'stripe') {
        // For Stripe payments, use the stripe endpoint
        response = await axios.post(
          `${backendURL}/api/order/stripe`,
          orderData,
          { 
            headers: { 
              token,
              origin: window.location.origin // Required for Stripe success/cancel URLs
            } 
          }
        );

        if (response.data.success && response.data.session_url) {
          // Redirect to Stripe checkout
          window.location.href = response.data.session_url;
          return;
        }
      } else {
        // For COD payments, use the regular place endpoint
        response = await axios.post(
          `${backendURL}/api/order/place`,
          orderData,
          { headers: { token } }
        );

        if (response.data.success) {
          // Clear the cart after successful order
          setCartItems({});
          localStorage.removeItem("cartItems");
          toast.success('Order placed successfully!');
          navigate('/orders');
        }
      }

      if (!response.data.success) {
        toast.error(response.data.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error(error.response?.data?.message || 'Failed to place order');
    }
  };

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type="text" 
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder='First name'
            required
          />
          <input 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type="text" 
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder='Last name'
            required
          />
        </div>
        <input 
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder='Email Address'
          required
        />
        <input 
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type="text" 
          name="street"
          value={formData.street}
          onChange={handleInputChange}
          placeholder='Street'
          required
        />
        <div className='flex gap-3'>
          <input 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type="text" 
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder='City'
            required
          />
          <input 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type="text" 
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            placeholder='State'
            required
          />
        </div>
        <div className='flex gap-3'>
          <input 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type="number" 
            name="zipcode"
            value={formData.zipcode}
            onChange={handleInputChange}
            placeholder='Zipcode'
            required
          />
          <input 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type="text" 
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder='Country'
            required
          />
        </div>
        <input 
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
          type="number" 
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder='Phone Number'
          required
        />
      </div>
      {/* right side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* payment method select */}
          <div className='flex gap-3 flex-col lg-flex-row'>
            <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe} alt=""/>
            </div>
            <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>            
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button 
              onClick={handleCheckout} 
              className="w-full bg-black text-white py-3 font-medium hover:bg-gray-500 transition"
            >
              CHECKOUT
            </button>
            <button 
              onClick={()=>navigate('/collection')} 
              className="w-full bg-black text-white py-3 font-medium hover:bg-gray-500 transition mt-3"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
