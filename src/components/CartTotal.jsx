import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"

const CartTotal = () => {
  const { products, currency, cartItems, delivery_fee, navigate } = useContext(ShopContext)

  const calculateSubtotal = () => {
    let subtotal = 0

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        const quantity = cartItems[itemId][size]
        const productData = products.find((product) => product._id === itemId)

        if (productData) {
          const itemPrice = calculateItemPrice(productData, size)
          subtotal += itemPrice * quantity
        }
      }
    }

    return subtotal
  }

  const calculateItemPrice = (product, quantityOption) => {
    if (!product) return 0    

    const isCake =
      product.category === "Cakes" || product.sizes?.includes("CAKE") || quantityOption === "CAKE"

    if (isCake) {
      return product.price || 0
    }

    if (["Cookies", "Cupcakes", "Muffins"].includes(product.category)) {
      const basePrice = product.price || 2.5
      switch (quantityOption) {
        case "6":
          return basePrice * 4
        case "12":
          return basePrice * 8
        default:
          return basePrice
      }
    } else {
      return product.price || 0
    }
  }

  const subtotal = calculateSubtotal()
  const total = subtotal + delivery_fee

  return (
    <div className="mt-8">
      <div className="border-b pb-2 mb-4">
        <h2 className="text-gray-500 font-medium text-lg">
          CART <span className="font-bold text-gray-700">TOTALS</span>
        </h2>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between py-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">
            {currency} {subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between py-2 bg-gray-50">
          <span className="text-gray-600">Shipping Fee</span>
          <span className="font-medium">
            {currency} {delivery_fee.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between py-3 border-t">
          <span className="font-medium text-gray-700">Total</span>
          <span className="font-bold text-lg">
            {currency} {total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
