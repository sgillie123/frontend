import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';  // Import the context
import Title from './Title';
import Productitem from './Productitem';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);  // Use context to get products
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0, 6));  // Set latest products
    }, [products]);  // Re-run effect if products change

    return (
        <div className="my-10">
            <div className="text-center py-8 text-3xl">
                <Title text1={'TRY'} text2={'OUR COOKIES!'}/>
                <p className="w-3/4 m-auto text-xs sm:text-base text-gray-600">
                    This is the latest and greatest. Get it hot and ready!
                </p>
            </div>

            {/* Rendering Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {latestProducts.map((item, index) => (
                <Productitem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))
            
        }

      </div>
    </div>
  )
}

export default LatestCollection
