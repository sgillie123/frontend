"use client"

import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import { Link } from "react-router-dom"

const Productitem = ({ id, image, name, price }) => {
  const { currency, formatPrice } = useContext(ShopContext)

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out w-full h-full object-cover"
          src={image || "/placeholder.svg"}
          alt={name}
          onError={(e) => {
            e.target.src = "/placeholder.svg"
          }}
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {formatPrice(price)}
      </p>
    </Link>
  )
}

export default Productitem
