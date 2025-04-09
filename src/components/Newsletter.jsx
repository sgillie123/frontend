import React from 'react'

const Newsletter = () => {
    const onSubmithandler = (event) => {
        event.preventDefault();
    }

    return (
        <div className='text-center px-4'>
            <p className='text-2xl font-medium text-gray-800'>Subscribe now and get 20% off</p>
            <p className='text-gray-400 mt-3'>learn whats going on</p>
            <form onSubmit={onSubmithandler} className='w-full max-w-xl mx-auto my-6'>
                <div className='flex'>
                    <input 
                        type="email" 
                        placeholder='Enter your email' 
                        required 
                        className='w-2/3 px-6 py-4 font-medium text-gray-800 border border-gray-300 rounded-l' 
                    />
                    <button 
                        type='submit' 
                        className='w-1/3 bg-black text-white text-medium px-6 py-4 rounded-r'
                    >
                        SUBSCRIBE
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Newsletter
