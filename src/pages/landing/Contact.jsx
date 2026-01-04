import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { LuLoaderCircle, LuMail, LuMapPin, LuMessageCircle, LuSend } from 'react-icons/lu'
import Footer from '../../components/Footer'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import toast from 'react-hot-toast'

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [cardsRef, cardsVisible] = useScrollReveal();
  const [formRef, formVisible] = useScrollReveal();

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.target);
    formData.append("access_key", import.meta.env.VITE_ACESS_KEY); 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Mensagem enviada! Retornaremos em breve.");
        event.target.reset();
      } else {
        toast.error("Erro ao enviar. Tente novamente.");
      }
    } catch (error) {
      toast.error("Ocorreu um erro de conexão.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <Header />
      
      <main className="pt-44 pb-24">
        <div className="container mx-auto px-6">
          <div className={`max-w-3xl mx-auto text-center mb-20 transition-all duration-1000 transform ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              Vamos conversar.
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed">
              Tem alguma dúvida sobre o Fintrack ou quer apenas dar um alô? 
              Nossa equipe está pronta para te ouvir.
            </p>
          </div>

          <div ref={cardsRef} className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24 transition-all duration-1000 delay-200 ${
            cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="group p-10 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-black transition-all duration-500">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-black group-hover:text-white transition-colors duration-500">
                <LuMail size={24} />
              </div>
              <h4 className="font-bold text-xl mb-2">E-mail</h4>
              <p className="text-gray-500 text-sm mb-4">Envie uma mensagem a qualquer hora.</p>
              <a href="mailto:fintrack-team@outlook.com" className="font-bold text-black no-underline hover:opacity-70 transition-opacity">
                fintrack-team@outlook.com
              </a>
            </div>
            <div className="group p-10 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-black transition-all duration-500">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-black group-hover:text-white transition-colors duration-500">
                <LuMessageCircle size={24} />
              </div>
              <h4 className="font-bold text-xl mb-2">Suporte Vivo</h4>
              <p className="text-gray-500 text-sm mb-4">Chat em tempo real com especialistas.</p>
              <p className="font-bold text-black">Segunda a Sexta, 9h às 18h</p>
            </div>
            <div className="group p-10 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-black transition-all duration-500">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-black group-hover:text-white transition-colors duration-500">
                <LuMapPin size={24} />
              </div>
              <h4 className="font-bold text-xl mb-2">Localização</h4>
              <p className="text-gray-500 text-sm mb-4">Venha tomar um café conosco.</p>
              <p className="font-bold text-black">São Paulo, Brasil</p>
            </div>
          </div>

          <div 
            ref={formRef} 
            className={`max-w-5xl mx-auto bg-black rounded-[3rem] p-8 md:p-16 text-white shadow-2xl transition-all duration-1000 ${
              formVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 translate-y-10'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Envie uma mensagem direta</h2>
                <p className="text-gray-400 mb-10 text-lg leading-relaxed">
                  Preencha o formulário e nossa equipe entrará em contato em menos de 24 horas úteis.
                </p>
                <div className="space-y-5">
                    <p className="flex items-center gap-3 text-sm text-gray-400">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> 
                        Suporte técnico ativo
                    </p>
                    <p className="flex items-center gap-3 text-sm text-gray-400">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> 
                        Tempo médio de resposta: 2h
                    </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <input 
                    name="name"
                    required
                    type="text" 
                    placeholder="Nome completo" 
                    className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 focus:border-white focus:outline-none transition-all text-white placeholder:text-gray-500 text-lg" 
                  />
                  <input 
                    name="email"
                    required
                    type="email" 
                    placeholder="Seu e-mail" 
                    className="w-full p-4 rounded-2xl bg-white/10 border border-white/10 focus:border-white focus:outline-none transition-all text-white placeholder:text-gray-500 text-lg" 
                  />
                </div>
                <textarea 
                  name="message"
                  required
                  placeholder="Como podemos ajudar?" 
                  rows="7" 
                  className="w-full p-5 rounded-2xl bg-white/10 border border-white/10 focus:border-white focus:outline-none transition-all text-white placeholder:text-gray-500 text-lg resize-none"
                ></textarea>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black py-5 rounded-2xl font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group text-lg"
                >
                  {isSubmitting ? (
                    <LuLoaderCircle className="animate-spin" size={24} />
                  ) : (
                    <>
                      Enviar Mensagem
                      <LuSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={22} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Contact;