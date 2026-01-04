import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-2xl font-bold mb-6 text-black">Fintrack</h3>
          <p className="text-gray-500 max-w-sm">
            Ajudando milhares de pessoas a organizarem sua vida financeira com simplicidade e tecnologia.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-black">Plataforma</h4>
          <ul className="space-y-4 text-gray-500">
            <li><Link to="/about" className="hover:text-black">Funcionalidades</Link></li>
            <li><Link to="/login" className="hover:text-black">Entrar</Link></li>
            <li><Link to="/signup" className="hover:text-black">Criar conta</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-black">Suporte</h4>
          <ul className="space-y-4 text-gray-500">
            <li><Link to="/contact" className="hover:text-black">Contate-nos</Link></li>
            <li><Link to="/terms" className="hover:text-black">Termos de Uso</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-50 pt-8 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Fintrack. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
)

export default Footer