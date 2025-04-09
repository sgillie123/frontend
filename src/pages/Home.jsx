import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import Bestseller from '../components/Bestseller'
import Policy from '../components/Policy'
import Newsletter from '../components/Newsletter'
const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection/>
      <Bestseller/>
      <Policy/>
      <Newsletter/>
    </div>
  )
}

export default Home
/*Call this in app */
