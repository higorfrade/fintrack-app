import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import HeroSection from '../../components/HeroSection'
import Features from '../../components/Features'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import Faq from '../../components/Faq'

const LandingPage = () => {
  const [heroVisible, setHeroVisible] = useState(false);
  const [featuresRef, featuresVisible] = useScrollReveal();
  const [faqRef, faqVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white text-gray-800 selection:bg-black selection:text-white">
        <Header />
        <main>
            <div className={`transition-all duration-1000 ease-out transform ${
                heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
                <HeroSection />
            </div>
            <div ref={featuresRef} className={`reveal-hidden ${featuresVisible ? 'reveal-visible' : ''}`}>
              <Features />
            </div>
            <div ref={faqRef} className={`reveal-hidden ${faqVisible ? 'reveal-visible' : ''}`}>
              <Faq />
            </div>
            <section ref={ctaRef} className="py-20">
              <div className={`container mx-auto px-4 reveal-hidden ${ctaVisible ? 'reveal-visible' : ''}`}>
                <div className="bg-black rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Pronto para mudar a sua vida financeira?</h2>
                    <p className="text-gray-400 mb-10 max-w-xl mx-auto text-lg">
                      Junte-se ao Fintrack hoje e tenha controle total sobre as suas economias.
                    </p>
                    <Link to="/signup" className="bg-white text-black px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all inline-block">
                      Criar minha conta gratuita
                    </Link>
                  </div>
                </div>
              </div>
            </section>
        </main>
        <Footer />
    </div>
  )
}

export default LandingPage