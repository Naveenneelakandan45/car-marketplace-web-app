import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Category from './components/Category'
import MostSearchedCar from './components/MostSearchedCar'
import InfoSection from './components/InfoSection'
import Footer from './components/Footer'
import InfoSection2 from './components/Infosection2'
import CarNews from './components/CarNews'
import Chat from './Chats/Chat'
import WhyUs from './WhyUs/WhyUs'



function Home() {
  return (
    <div>
     {/* Header */}
         <Header />
     {/* Hero */}
         <Hero />
         {/* Category */}
         <Category/>
         {/* Chat*/}
         <Chat/>
         {/* most searched car*/}
         <MostSearchedCar/>
         {/* WhyUs */}
         <WhyUs/>
         {/* InfoSection */}
         <InfoSection/>
         {/* Footer */}
         <InfoSection2/>
         <CarNews/>
         <Footer/>
    </div>
  )
}

export default Home
