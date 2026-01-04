import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets';

const HeroSection = () => {
  return (
    <section className="pt-20 pb-10 md:pt-32 bg-linear-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-6">
          Assuma o controle total das <br className="hidden md:block" /> 
          <span>suas finanças</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-500 leading-relaxed">
          Sua base para uma gestão financeira segura e inteligente. Acompanhe suas receitas e despesas sem esforço para alcançar seus objetivos financeiros.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link to="/signup" className="w-full sm:w-auto bg-black text-white px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-gray-200">
            Comece Grátis
          </Link>
          <Link to="/about" className="w-full sm:w-auto flex items-center justify-center gap-2 border border-gray-200 bg-white text-gray-800 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all">
            Ver Demo <LuArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="mt-20 relative max-w-5xl mx-auto">
          <div className="absolute -inset-1 bg-linear-to-r from-gray-200 to-gray-100 rounded-4xl blur opacity-30"></div>
          <img 
            src={assets.fintrack_app}
            alt="Fintrack Preview" 
            className="relative rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection