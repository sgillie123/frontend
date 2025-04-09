import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Productitem from '../components/Productitem.jsx'
import Title from '../components/Title.jsx'

const RelatedProducts = ({ category, subCategory }) => {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();

            // Filter by matching category and subCategory
            productsCopy = productsCopy.filter((item) => category === item.category);
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);

            // Update the related state with filtered products (limit to 5)
            setRelated(productsCopy.slice(0, 5));
      
        }
    }, [products, category, subCategory]);

    return (
        <div className='my-24'>
            <div className='text-center text-3xl py-2'>
                <Title text1={'RELATED'} text2={'PRODUCTS'} />
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 gap-y-6'>
                {related.length > 0 ? (
                    related.map((item, index) => (
                        <Productitem 
                            key={index} 
                            id={item._id} 
                            name={item.name} 
                            price={item.price} 
                            image={item.image}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center py-4">No related products found</p>
                )}
            </div>
        </div>
    );
};

export default RelatedProducts;