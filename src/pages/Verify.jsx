import React, { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { backendURL, token, user, setCartItems } = useContext(ShopContext);

  useEffect(() => {
    const verifyPayment = async () => {
      const success = searchParams.get('success');
      const orderId = searchParams.get('orderId');

      if (!orderId) {
        toast.error('Invalid order ID');
        navigate('/');
        return;
      }

      try {
        const response = await axios.post(
          `${backendURL}/api/order/verifyStripe`,
          {
            orderId,
            success,
            userId: user?._id
          },
          { headers: { token } }
        );

        if (response.data.success) {
          // Clear the cart
          setCartItems({});
          localStorage.removeItem('cartItems');
          toast.success('Order placed successfully!');
        } else {
          toast.error('Payment verification failed');
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        toast.error('Failed to verify payment');
      } finally {
        navigate('/orders');
      }
    };

    verifyPayment();
  }, [searchParams, navigate, backendURL, token, user, setCartItems]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Verify; 