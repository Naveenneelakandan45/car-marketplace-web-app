import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Category from './components/Category'
import MostSearchedCar from './components/MostSearchedCar'
import InfoSection from './components/InfoSection'
import Footer from './components/Footer'
import InfoSection2 from './components/Infosection2'



function Home() {
  return (
    <div>
     {/* Header */}
         <Header />
     {/* Hero */}
         <Hero />
         {/* Category */}
         <Category/>
         {/* most searched car*/}
         <MostSearchedCar/>
         {/* InfoSection */}
         <InfoSection/>
         {/* Footer */}
         <InfoSection2/>
         <Footer/>
    </div>
  )
}

export default Home
