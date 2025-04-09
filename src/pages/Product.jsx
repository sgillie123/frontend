"use client"

import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ShopContext } from "../context/ShopContext"
import { assets } from "../assets/assets"
import RelatedProducts from "../components/RelatedProducts"

const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart, cartItems, formatPrice } = useContext(ShopContext)
  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState("")
  const [selectedQty, setSelectedQty] = useState("1")
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const fetchProductData = () => {
    const product = products.find((item) => item._id === productId)
    if (product) {
      setProductData(product)
      setImage(product.image[0])
    }
  }

  const getPrice = () => {
    if (!productData) return 0

    if (productData.category === "cookies") {
      switch (selectedQty) {
        case "6":
          return 12
        case "12":
          return 20
        default:
          return 2.5
      }
    } else if (productData.category === "cupcakes") {
      switch (selectedQty) {
        case "6":
          return 15
        case "12":
          return 30
        default:
          return 4
      }
    } else {
      return productData.price || 0 // For cakes or other categories
    }
  }

  const handleAddToCart = async () => {
    if (productData && !isAddingToCart) {
      try {
        setIsAddingToCart(true)
        await addToCart(productData._id, selectedQty)
        console.log("Added to cart:", productData._id, selectedQty)

        // Show added to cart message
        setAddedToCart(true)
        setTimeout(() => {
          setAddedToCart(false)
        }, 2000)
      } catch (error) {
        console.error("Error adding to cart:", error)
      } finally {
        setIsAddingToCart(false)
      }
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  useEffect(() => {
    console.log("Cart Items:", cartItems)
  }, [cartItems])

  if (!productData) return <div className="opacity-0"></div>

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item || "/placeholder.svg"}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
                onError={(e) => {
                  e.target.src = "/placeholder.svg"
                }}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto"
              src={image || "/placeholder.svg"}
              alt=""
              onError={(e) => {
                e.target.src = "/placeholder.svg"
              }}
            />
          </div>
        </div>

        {/* Product info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon || "/placeholder.svg"} alt="" className="w-3.5" />
            <img src={assets.star_icon || "/placeholder.svg"} alt="" className="w-3.5" />
            <img src={assets.star_icon || "/placeholder.svg"} alt="" className="w-3.5" />
            <img src={assets.star_icon || "/placeholder.svg"} alt="" className="w-3.5" />
            <img src={assets.star_icon || "/placeholder.svg"} alt="" className="w-3.5" />
            <p className="pl-2">(23,493)</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {currency}
            {formatPrice(getPrice())}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

          <div className="flex flex-col gap-4 my-8">
            <p>Select Amount</p>

            {(productData.category === "cookies" || productData.category === "cupcakes") && (
              <div className="flex gap-2">
                {[
                  { label: "One", value: "1" },
                  { label: "Half Dozen", value: "6" },
                  { label: "Dozen", value: "12" },
                ].map(({ label, value }) => (
                  <button
                    key={value}
                    className={`px-3 py-1 border text-md ${
                      selectedQty === value ? "bg-black text-white" : "text-black"
                    }`}
                    onClick={() => setSelectedQty(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

            <div className="relative">
              <button
                onClick={handleAddToCart}
                className={`bg-black text-white px-6 py-3 mt-4 w-fit ${isAddingToCart ? "opacity-70" : ""}`}
                disabled={isAddingToCart}
              >
                {isAddingToCart ? "ADDING..." : "ADD TO CART"}
              </button>

              {addedToCart && (
                <div className="absolute left-0 mt-2 bg-green-100 text-green-800 px-4 py-2 rounded">Added to cart!</div>
              )}
            </div>

            <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% Hand-Made Product</p>
              <p>No cash at delivery</p>
              <p>Easy return and exchange policy within 2 days</p>
            </div>
          </div>
        </div>
      </div>
      {/* description and review */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews(23,493)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Our bakery is built on a love for sharing sweet moments, one bite at a time. We specialize in homemade
            cookies, cupcakes, and cakes, each made with care, creativity, and the finest ingredients. Whether you're
            celebrating something special or just treating yourself, our baked goods are crafted to bring joy and
            comfort with every bite.
          </p>
          <p>
            From soft and chewy cookies to fluffy cupcakes and rich, decadent cakes, there's something for every sweet
            tooth. Our online shop makes it easy to explore our menu, choose your favorite flavors, and order exactly
            what you need — whether it's one treat, a half dozen, or a full box to share.
          </p>
          {/* display related products */}
          <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </div>
      </div>
    </div>
  )
}

export default Product
