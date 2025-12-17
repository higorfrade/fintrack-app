import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom';
import { LuMenu, LuX } from 'react-icons/lu';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navLinks = [
        {name: "Ínicio", to: "/home"},
        {name: "Sobre", to: "/about"},
        {name: "Contate-nos", to: "/contact"}
    ]

  return (
    <header className="border-b border-gray-200">
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
                <div className="flex items-center gap-2">
                    <img src={assets.fintrack_logo} alt="Fintrack Logo" className="w-60% h-10" />
                </div>

                <nav className="hidden lg:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link to={link.to} key={link.name} href={link.href} className="text-gray-600 hover:text-black transition-colors">
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center space-x-4">
                    <div className="hidden sm:flex items-center space-x-4">
                        <Link to="/login" className="text-gray-600 hover:text-black transition-colors">
                            Entrar
                        </Link>
                        <Link to="/signup" className="bg-[#121212] text-white px-4 py-2 rounded-lg font-semibold hover:bg-black transition-colors">
                            Vamos Começar
                        </Link>
                    </div>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
                        aria-label="Toggle menu">
                        {isMenuOpen ? <LuX className="w-6 h-6" /> : <LuMenu className="w-6 h-6" />}
                    </button>
                </div>
            </div>
        </div>

        {isMenuOpen && (
            <div className="lg:hidden bg-white border-t border-gray-200">
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} className="text-gray-600 hover:text-black transition-colors cursor-pointer">
                                {link.name}
                            </a>
                        ))}
                        <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
                            <a href="#" className="text-gray-600 hover:text-black transition-colors w-full text-center">
                                Entrar
                            </a>
                            <a href="#" className="bg-[#121212] text-white px-4 py-2 rounded-lg font-semibold hover:bg-black transition-colors text-center">
                                Vamos Começar
                            </a>
                        </div>
                    </nav>
                </div>
            </div>
        )}
    </header>
  );
}

export default Header