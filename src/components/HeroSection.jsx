import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <section className="text-center py-20 md:py-32">
        <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                Assuma o controle das suas finanças
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-500">
                Sua base para uma gestão financeira segura e inteligente. Acompanhe suas receitas e despesas sem esforço para alcançar seus objetivos financeiros.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link to="/signup" className="w-full sm:w-auto bg-[#121212] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-black transition-all shadow-md">
                    Comece a gerenciar agora
                </Link>
                <Link to="/login" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-100 text-gray-800 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-200 transition-all">
                    Saiba mais <LuArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </div>
    </section>
  )
}

export default HeroSection