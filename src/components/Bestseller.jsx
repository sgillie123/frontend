import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import Productitem from './Productitem';

const Bestseller = () => {
    const { products } = useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProducts = products
            .filter((item) => item.bestseller)
            .sort((a, b) => a.displayOrder - b.displayOrder);
        setBestSeller(bestProducts.slice(0, 8));
    }, [products]);

    return (
        <div className='m-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLERS'}/>
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Enjoy our best sellers that you love!
                </p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {bestSeller.map((item, index) => (
                    <Productitem 
                        key={item._id || index} 
                        id={item._id} 
                        image={item.image} 
                        name={item.name} 
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
};

export default Bestseller;
