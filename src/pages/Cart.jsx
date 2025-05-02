import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import CartTotal from "../components/CartTotal"
import QuantityInput from "../components/QuantityInput"
import { assets } from "../assets/assets"
import Title from "../components/Title"

const Cart = () => {
  const { products, currency, cartItems, deleteCartItem, updateCartQuantity, navigate, requireAuth } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])
  const [inputValues, setInputValues] = useState({}) // For tracking input field values

  useEffect(() => {
    const tempData = []
    const tempInputValues = {}

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          const cartItemKey = `${items}-${item}`
          tempData.push({
            _id: items,
            side: item,
            quantity: cartItems[items][item],
          })
          tempInputValues[cartItemKey] = cartItems[items][item].toString()
        }
      }
    }
    setCartData(tempData)
    setInputValues(tempInputValues)
  }, [cartItems])

  // Helper function to safely get product image
  const getProductImage = (product) => {
    if (!product || !product.image || !Array.isArray(product.image) || product.image.length === 0) {
      return "/placeholder.svg" // Fallback image
    }
    return product.image[0]
  }

  // Calculate price based on quantity option and product category
  const calculatePrice = (product, quantityOption) => {
    if (!product) return 0

    if (product.category === "Cookies") {
      switch (quantityOption) {
        case "6":
          return 12
        case "12":
          return 20
        default:
          return 2.50
      }
    } else if (product.category === "Cupcakes") {
      switch (quantityOption) {
        case "6":
          return 15
        case "12":
          return 30
        default:
          return 4
      }
    } else {
      return product.price || 0 // For cakes or other categories
    }
  }

  // Format the quantity option for display
  const formatQuantity = (option) => {
    switch (option) {
      case "1":
        return "Single"
      case "6":
        return "Half Dozen"
      case "12":
        return "Dozen"
      default:
        return option
    }
  }

  // Handle input change
  const handleInputChange = (itemId, side, value) => {
    const cartItemKey = `${itemId}-${side}`

    // Update local input value state
    setInputValues({
      ...inputValues,
      [cartItemKey]: value,
    })
  }

  // Handle input blur (when user clicks away)
  const handleInputBlur = (itemId, side, newQuantity) => {
    // Update cart quantity
    updateCartQuantity(itemId, side, newQuantity)
  }

  const handleCheckout = () => {
    if (requireAuth()) {
      navigate('/place-order')
    }
  }

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      {cartData.length === 0 ? (
        <div className='text-center py-8'>
          <p className='text-gray-500'>Your cart is empty</p>
          <button 
            onClick={() => navigate('/collection')} 
            className='mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-700'
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-8'>
          <div className='md:col-span-2'>
            {/* Cart items list */}
            {cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id)
              const itemPrice = calculatePrice(productData, item.side)
              const cartItemKey = `${item._id}-${item.side}`

              return (
                <div key={index} className="flex items-center border-b pb-6">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-gray-100 overflow-hidden mr-4">
                    {productData ? (
                      <img
                        src={getProductImage(productData) || "/placeholder.svg"}
                        alt={productData.name || "Product"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.log("Image failed to load:", e)
                          e.target.src = "/placeholder.svg"
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xs text-gray-500">No image</span>
                      </div>
                      
                    )}
                  </div>
                  

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{productData ? productData.name : "Product not found"}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <span className="mr-4">
                        {currency}
                        {itemPrice.toFixed(2)}
                      </span>
                      <span>{formatQuantity(item.side)}</span>
                    </div>
                  </div>

                  {/* Quantity Input with Arrows */}
                  <div className="flex items-center mx-4">
                    <QuantityInput
                      value={item.quantity}
                      onChange={(value) => handleInputChange(item._id, item.side, value)}
                      onBlur={(value) => handleInputBlur(item._id, item.side, value)}
                    />
                  </div>

                  {/* Delete Button - Now completely removes the item */}
                  <button
                    onClick={() => deleteCartItem(item._id, item.side)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Delete item"
                  >
                     <img className='w-4 mr-4 sm:w-5 cursor-pointer'src={assets.trash} alt=''/>
                  </button>
                </div>
              )
            })}
          </div>
          <div className='md:col-span-1'>
            <CartTotal />
            <button 
              onClick={handleCheckout}
              className='w-full bg-black text-white py-3 mt-4 rounded hover:bg-gray-700'
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart

