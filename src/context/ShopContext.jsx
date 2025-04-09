"use client"

import { createContext, useEffect, useState } from "react"
import { products } from "../assets/assets"
import { useNavigate } from "react-router-dom"

// Create context outside of any component function
const ShopContext = createContext(null)

// Create the provider as a separate, named function component
function ShopContextProvider(props) {
  const currency = "$"
  const delivery_fee = 10
  const [search, setSearch] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [cartItems, setCartItems] = useState({})
  const navigate= useNavigate();

  // Format price consistently across the app
  const formatPrice = (price) => {
    return price.toFixed(2)
  }

  // Add to cart function
  const addToCart = async (itemId, size) => {
    try {
      // Create a deep copy of the cart items
      const cartData = JSON.parse(JSON.stringify(cartItems))

      // Initialize the item if it doesn't exist
      if (!cartData[itemId]) {
        cartData[itemId] = {}
      }

      // Increment the quantity for the specific size
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1
      } else {
        cartData[itemId][size] = 1
      }

      // Update the cart state
      setCartItems(cartData)
      console.log("Cart updated successfully:", cartData)
    } catch (error) {
      console.error("Error adding to cart:", error)
    }
  }

  // Function to remove item from cart
  const removeFromCart = (itemId, size) => {
    try {
      // Create a deep copy of the cart items
      const cartData = JSON.parse(JSON.stringify(cartItems))

      // Check if the item exists
      if (cartData[itemId] && cartData[itemId][size]) {
        // Decrement the quantity
        cartData[itemId][size] -= 1

        // Remove the size if quantity is 0
        if (cartData[itemId][size] <= 0) {
          delete cartData[itemId][size]
        }

        // Remove the item if no sizes left
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId]
        }

        // Update the cart state
        setCartItems(cartData)
        console.log("Item removed from cart:", cartData)
      }
    } catch (error) {
      console.error("Error removing from cart:", error)
    }
  }

  // Function to completely delete an item from cart
  const deleteCartItem = (itemId, size) => {
    try {
      // Create a deep copy of the cart items
      const cartData = JSON.parse(JSON.stringify(cartItems))

      // Check if the item exists
      if (cartData[itemId] && cartData[itemId][size]) {
        // Delete the size completely
        delete cartData[itemId][size]

        // Remove the item if no sizes left
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId]
        }

        // Update the cart state
        setCartItems(cartData)
        console.log("Item deleted from cart:", cartData)
      }
    } catch (error) {
      console.error("Error deleting item from cart:", error)
    }
  }

  // Function to update quantity directly
  const updateCartQuantity = (itemId, size, quantity) => {
    try {
      // Create a deep copy of the cart items
      const cartData = JSON.parse(JSON.stringify(cartItems))

      // Initialize the item if it doesn't exist
      if (!cartData[itemId]) {
        cartData[itemId] = {}
      }

      if (quantity <= 0) {
        // Remove the size if quantity is 0 or negative
        if (cartData[itemId][size]) {
          delete cartData[itemId][size]
        }

        // Remove the item if no sizes left
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId]
        }
      } else {
        // Set the new quantity
        cartData[itemId][size] = quantity
      }

      // Update the cart state
      setCartItems(cartData)
      console.log("Cart quantity updated:", cartData)
    } catch (error) {
      console.error("Error updating cart quantity:", error)
    }
  }
  

  useEffect(() => {
    console.log("Cart items updated:", cartItems)
  }, [cartItems])

  const getCartCount = () => {
    let totalCount = 0
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item]
          }
        } catch (error) {
          console.error("Error counting cart items:", error)
        }
      }
    }
    return totalCount
  }
  

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    removeFromCart,
    deleteCartItem,
    updateCartQuantity,
    getCartCount,
    formatPrice,
    navigate
  }

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
}

// Export both the context and provider separately
export { ShopContext, ShopContextProvider }

// Also export the provider as default for backward compatibility
export default ShopContextProvider
