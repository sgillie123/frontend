import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext"
import CartTotal from "../components/CartTotal"
import QuantityInput from "../components/QuantityInput"
import { assets } from "../assets/assets"

const Cart = () => {
  const { products, currency, cartItems, deleteCartItem, updateCartQuantity, navigate } = useContext(ShopContext)
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

    if (product.category === "cookies") {
      switch (quantityOption) {
        case "6":
          return 12
        case "12":
          return 20
        default:
          return 2.50
      }
    } else if (product.category === "cupcakes") {
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="border-b pb-2 mb-8">
        <h1 className="text-xl font-medium">
          YOUR <span className="font-bold">CART</span>
        </h1>
      </div>

      {cartData.length === 0 ? (
        <div className="py-8 text-center text-gray-500">Your cart is empty</div>
      ) : (
        <div className="space-y-6">
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
          

          {/* Cart Totals */}
          <CartTotal />
          <div className="mt-6">
        <button onClick={()=>navigate('/place-order')} className="w-full bg-black text-white py-3 font-medium hover:bg-gray-800 transition">CHECKOUT</button>
        <button onClick={()=>navigate('/collection')} className="w-full border border-black py-3 font-medium hover:bg-gray-50 transition mt-3">
          CONTINUE SHOPPING
        </button>
      </div>
        </div>
      )}
    </div>
  )
}

export default Cart

