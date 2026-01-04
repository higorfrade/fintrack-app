import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { LuShieldCheck, LuClock, LuExternalLink } from 'react-icons/lu';

const Terms = () => {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { 
      id: "aceitacao",
      title: "1. Aceitação dos Termos", 
      content: "Ao acessar e utilizar a plataforma Fintrack, você concorda expressamente em cumprir estes termos de serviço, bem como todas as leis e regulamentos aplicáveis. Se você não concordar com algum destes termos, está proibido de usar ou acessar este site." 
    },
    { 
      id: "conta",
      title: "2. Uso da Conta", 
      content: "Para acessar certas funcionalidades, você deve criar uma conta. Você é o único responsável por manter a confidencialidade de suas credenciais e por todas as atividades que ocorrem sob sua conta. Notifique-nos imediatamente sobre qualquer uso não autorizado." 
    },
    { 
      id: "privacidade",
      title: "3. Privacidade de Dados", 
      content: "Sua privacidade é o pilar do Fintrack. Utilizamos criptografia de ponta a ponta para garantir que seus dados financeiros permaneçam privados. Nunca venderemos seus dados a terceiros." 
    },
    { 
      id: "assinatura",
      title: "4. Planos e Assinaturas", 
      content: "O Fintrack oferece um plano gratuito. Não é necessário realizar nenhum pagamento na plataforma para usufluir das ferramentas que disponibilizamos." 
    }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white">
      <Header />    
      <main className="pt-44 pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto mb-20">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
              <LuShieldCheck className="text-black" />
              <span>Jurídico</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
              Termos de Uso.
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-500">
              <p className="flex items-center gap-2">
                <LuClock size={18} />
                Última atualização: 19 de Dezembro de 2025
              </p>
              <span className="hidden md:block w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
              <p>Versão 1.5.0</p>
            </div>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            <aside className="lg:col-span-4">
              <nav className="sticky top-32 space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 ml-4">Navegação</p>
                {sections.map((section, idx) => (
                  <a
                    key={idx}
                    href={`#${section.id}`}
                    onClick={() => setActiveSection(idx)}
                    className={`block p-4 rounded-2xl transition-all duration-300 ${
                      activeSection === idx 
                      ? 'bg-gray-100 text-black font-bold' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                    }`}
                  >
                    {section.title.split('. ')[1]}
                  </a>
                ))}
                
                <hr className="my-6 border-gray-100" />
                
                <div className="p-6 bg-black rounded-4xl text-white">
                  <h4 className="font-bold mb-2">Dúvidas?</h4>
                  <p className="text-sm text-gray-400 mb-4">Nossa equipe está à disposição para esclarecimentos.</p>
                  <a href="/contact" className="text-sm font-bold flex items-center gap-2 hover:underline">
                    Fale conosco <LuExternalLink size={14} />
                  </a>
                </div>
              </nav>
            </aside>

            <div className="lg:col-span-8 space-y-16">
              {sections.map((section, i) => (
                <section 
                  key={i} 
                  id={section.id} 
                  className="scroll-mt-32 animate-in fade-in slide-in-from-bottom-4 duration-700"
                >
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-4">
                    <span className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-lg text-sm">
                      0{i + 1}
                    </span>
                    {section.title.split('. ')[1]}
                  </h2>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-600 leading-relaxed text-lg text-justify">
                      {section.content}
                    </p>
                  </div>
                </section>
              ))}

              <div className="mt-20 p-8 border-t border-gray-100 text-gray-400 text-sm">
                <p>
                  Estes termos são regidos e interpretados de acordo com as leis do Brasil e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Terms;