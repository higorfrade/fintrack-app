import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom';
import { LuMenu, LuX } from 'react-icons/lu';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navLinks = [
        {name: "Ínicio", to: "/home"},
        {name: "Sobre", to: "/about"},
        {name: "Contate-nos", to: "/contact"}
    ]

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        }
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 h-20 flex items-center ${
            scrolled ? 'bg-white/70 backdrop-blur-lg border-b border-gray-100 shadow-sm' : 'bg-transparent border-b border-transparent'
        }`}>
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <img src={assets.fintrack_logo} alt="Fintrack" className="h-10 w-auto" />
                    </Link>

                    <nav className="hidden lg:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <NavLink 
                                key={link.name} 
                                to={link.to} 
                                className={({ isActive }) => 
                                    `text-sm font-medium transition-all duration-300 relative py-1
                                    ${isActive 
                                        ? 'text-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black' 
                                        : 'text-gray-500 hover:text-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-black hover:after:w-full after:transition-all'
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <Link to="/login" className="hidden sm:block text-sm font-bold text-gray-700 hover:text-black">
                            Entrar
                        </Link>
                        <Link to="/signup" className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-black/20 transition-all active:scale-95">
                            Começar agora
                        </Link>
                        
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-gray-600">
                            {isMenuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 p-6 shadow-xl lg:hidden">
                    <nav className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <NavLink 
                                key={link.name} 
                                to={link.to} 
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) => 
                                    `text-lg font-bold ${isActive ? 'text-black' : 'text-gray-500'}`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Header