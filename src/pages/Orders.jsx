import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Orders = () => { 
  const { backendURL, token, user, setToken, setUser } = useContext(ShopContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!token || !user) {
          setLoading(false)
          toast.error('Please login to view your orders')
          navigate('/login')
          return
        }

        console.log('Fetching orders for user:', user._id); // Debug log

        const response = await axios.post(
          `${backendURL}/api/order/userorders`,
          {},  // No need to send userId, it's handled by auth middleware
          { headers: { token } }
        )
        
        console.log('Orders response:', response.data); // Debug log

        if (response.data.success) {
          setOrders(response.data.orders || [])
        } else {
          toast.error(response.data.message || 'Failed to fetch orders')
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
        if (error.response?.status === 401) {
          // Token is invalid or expired
          setToken('')
          setUser(null)
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          toast.error('Session expired. Please login again')
          navigate('/login')
        } else {
          toast.error('Failed to fetch orders')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [token, user, backendURL, navigate, setToken, setUser])

  const getStatusColor = (status) => {
    switch(status) {
      case 'Order Placed': return 'bg-blue-100 text-blue-800';
      case 'Packing': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Out for delivery': return 'bg-orange-100 text-orange-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!token || !user) {
    return null
  }

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <div className='text-2xl mb-8'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div className='space-y-6'>
        {orders.length === 0 ? (
          <p className='text-center py-8 text-gray-500'>No orders found</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className='bg-white rounded-lg shadow-md p-6 mb-6'>
              <div className='flex flex-col gap-6'>
                {order.items.map((item, itemIndex) => (
                  <div key={itemIndex} className='flex items-start gap-4 border-b pb-4 last:border-b-0 last:pb-0'>
                    <div className='w-24 h-24 flex-shrink-0'>
                      <img 
                        className='w-full h-full object-cover rounded-md' 
                        src={item.image} 
                        alt={item.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                        }}
                      />
                    </div>
                    <div className='flex-grow'>
                      <h3 className='text-lg font-medium text-gray-800'>{item.name}</h3>
                      <div className='mt-2 space-y-1'>
                        <p className='text-gray-600'>
                          Quantity: <span className='font-medium text-gray-800'>{item.quantity}</span>
                        </p>
                        <p className='text-gray-600'>
                          Size: <span className='font-medium text-gray-800'>
                            {item.size === '6' ? 'Half Dozen' : item.size === '12' ? 'Dozen' : 'Single'}
                          </span>
                        </p>
                        <p className='text-gray-600'>
                          Price: <span className='font-medium text-gray-800'>${item.price.toFixed(2)}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className='flex flex-wrap justify-between items-center pt-4 border-t gap-4'>
                  <div className='flex-grow'>
                    <p className='text-gray-600'>
                      Order Date: <span className='font-medium text-gray-800'>
                        {new Date(order.date).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </p>
                    <div className='flex items-center gap-2 mt-1'>
                      <span className='text-gray-600'>Status:</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <div className='text-right'>
                      <p className='text-gray-600'>Total Amount:</p>
                      <p className='text-xl font-bold text-gray-800'>${order.amount.toFixed(2)}</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <button 
                        onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=track+order+${order._id}`, '_blank')}
                        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
                      >
                        Track Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Orders
