import React, { useState } from 'react'
import { LuMinus, LuPlus } from 'react-icons/lu';

const faqs = [
    { q: "O que é o Fintrack?", a: "Somos uma plataforma para gestão financeira, com serviços que vão te ajudar a ter uma visão melhor sobre os seus gastos." },
    { q: "O Fintrack é gratuito?", a: "Sim! Oferecemos recursos totalmente gratuitos para te ajudar a controlar a suas finanças, incluindo relatórios e lembretes diários." },
    { q: "Meus dados estão seguros?", a: "Utilizamos criptografia e as melhores práticas de segurança para garantir que apenas você tenha acesso aos seus dados." },
    { q: "Posso exportar meus dados?", a: "Com certeza. Você pode exportar seus relatórios em PDF ou CSV a qualquer momento." }
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-12">Perguntas Frequentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span className="font-bold text-gray-900">{faq.q}</span>
                {openIndex === i ? <LuMinus /> : <LuPlus />}
              </button>
              {openIndex === i && (
                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq