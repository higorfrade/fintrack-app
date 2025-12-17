import React from 'react'
import Header from '../../components/Header'
import HeroSection from '../../components/HeroSection'

const LandingPage = () => {
  return (
    <div className="bg-white text-gray-800">
        <Header />
        <main>
            <HeroSection />
        </main>
    </div>
  )
}

export default LandingPage