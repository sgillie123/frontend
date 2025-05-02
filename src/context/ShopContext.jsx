"use client"

import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import axios from "axios"

// Create context outside of any component function
const ShopContext = createContext(null)

// Create the provider as a separate, named function component
function ShopContextProvider(props) {
  const currency = "$"
  const delivery_fee = 10
  const [search, setSearch] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState(() => {
    // Try to load cart from localStorage first
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  })
  const [token, setToken] = useState(() => {
    // Initialize token from localStorage
    return localStorage.getItem("token") || ""
  })
  const [user, setUser] = useState(() => {
    // Initialize user from localStorage
    const savedUser = localStorage.getItem("user")
    return savedUser ? JSON.parse(savedUser) : null
  })
  const backendURL = "http://localhost:4000"
  const navigate = useNavigate();

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/product/list`)
      if (response.data?.success && response.data.products) {
        setProducts(response.data.products)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  // Fetch products on mount and every 30 seconds
  useEffect(() => {
    fetchProducts()
    const interval = setInterval(fetchProducts, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [])

  // Verify token and refresh user data on mount and token changes
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setUser(null)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        return
      }

      try {
        const response = await axios.get(`${backendURL}/api/user/verify`, {
          headers: { token }
        })
        
        if (response.data.success) {
          setUser(response.data.user)
          localStorage.setItem("user", JSON.stringify(response.data.user))
        } else {
          // Token is invalid
          setToken("")
          setUser(null)
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          toast.error("Session expired. Please login again")
          navigate("/login")
        }
      } catch (error) {
        console.error("Token verification error:", error)
        // Clear invalid token
        setToken("")
        setUser(null)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.error("Session expired. Please login again")
        navigate("/login")
      }
    }

    verifyToken()
  }, [token, backendURL, navigate])

  // Save token to localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token)
    } else {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    }
  }, [token])

  // Load cart from backend when user logs in
  useEffect(() => {
    const loadUserCart = async () => {
      if (user?._id && token) {
        try {
          const response = await axios.get(`${backendURL}/api/cart/get`, {
            headers: { token }
          });
          if (response.data.success) {
            setCartItems(response.data.cartData || {});
            localStorage.setItem("cartItems", JSON.stringify(response.data.cartData || {}));
          }
        } catch (error) {
          console.error('Error loading cart:', error);
          // If backend fails, keep using localStorage cart
          const savedCart = localStorage.getItem("cartItems");
          if (savedCart) {
            setCartItems(JSON.parse(savedCart));
          }
        }
      }
    };
    loadUserCart();
  }, [user, token, backendURL]);

  // Save cart to both localStorage and backend when it changes
  useEffect(() => {
    // Always save to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Save to backend if user is logged in
    const saveCartToBackend = async () => {
      if (user?._id && token) {
        try {
          await axios.post(
            `${backendURL}/api/cart/add`,
            { cartData: cartItems },
            { headers: { token } }
          );
        } catch (error) {
          console.error('Error saving cart:', error);
          // Continue silently as the cart is saved in localStorage
        }
      }
    };
    saveCartToBackend();
  }, [cartItems, user, token, backendURL]);

  // Clear cart only when user explicitly logs out
  const handleLogout = () => {
    setToken("")
    setUser(null)
    setCartItems({})
    localStorage.removeItem("cartItems")
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  // Function to check if user is authenticated
  const isAuthenticated = () => {
    return !!token && !!user
  }

  // Function to require authentication
  const requireAuth = () => {
    if (!isAuthenticated()) {
      toast.error("Please login to continue")
      navigate("/login")
      return false
    }
    return true
  }

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

      // If user is logged in, update backend
      if (user && token) {
        await axios.post(
          `${backendURL}/api/cart/add`,
          { cartData },
          { headers: { token } }
        );
      }
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
    setCartItems,
    addToCart,
    removeFromCart,
    deleteCartItem,
    updateCartQuantity,
    getCartCount,
    formatPrice,
    navigate,
    backendURL,
    token,
    setToken,
    user,
    setUser,
    isAuthenticated,
    requireAuth,
    handleLogout
  }

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
}

// Export both the context and provider separately
export { ShopContext, ShopContextProvider }

// Also export the provider as default for backward compatibility
export default ShopContextProvider
