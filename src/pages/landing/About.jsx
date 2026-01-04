import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { LuRocket, LuShieldCheck, LuTarget, LuTrendingUp, LuUsers } from 'react-icons/lu'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const About = () => {
    const [heroRef, heroVisible] = useScrollReveal();
    const [gridRef, gridVisible] = useScrollReveal();
    const [valuesRef, valuesVisible] = useScrollReveal();

    return (
        <div className="bg-white text-gray-900 selection:bg-black selection:text-white overflow-x-hidden">
            <Header />          
            <main>
                <section 
                    ref={heroRef}
                    className={`pt-44 pb-24 transition-all duration-1000 transform ${
                        heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    <div className="container mx-auto px-6 text-center">
                        <div className="max-w-3xl mx-auto">
                            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-gray-100 text-black text-xs font-bold uppercase tracking-widest mb-8">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                                </span>
                                Nossa Essência
                            </span>
                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-6">
                                Gestão financeira <br />
                                <span>sem esforço.</span>
                            </h1>
                            <p className="text-xl text-gray-500 leading-relaxed">
                                No Fintrack, transformamos a complexidade dos números em clareza visual. 
                                Criamos ferramentas para quem valoriza o tempo tanto quanto o dinheiro.
                            </p>
                        </div>
                    </div>
                </section>
                <section ref={gridRef} className="py-16">
                    <div className="container mx-auto px-6">
                        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 transition-all duration-1000 ${
                            gridVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                        }`}>
                            <div className="lg:col-span-7 bg-gray-50 rounded-[3rem] p-10 md:p-14 border border-gray-100 relative group overflow-hidden">
                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform duration-500">
                                        <LuTarget className="text-black" size={28} />
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4">Seu Problema</h3>
                                    <p className="text-gray-600 text-lg max-w-md leading-relaxed">
                                        Aplicativos datados e planilhas manuais consomem sua energia. 
                                        A falta de organização é o maior obstáculo para a sua prosperidade.
                                    </p>
                                </div>
                                <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <LuTrendingUp size={200} />
                                </div>
                            </div>
                            <div className="lg:col-span-5 bg-black rounded-[3rem] p-10 md:p-14 text-white relative group overflow-hidden shadow-2xl shadow-black/20">
                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                        <LuRocket className="text-white" size={28} />
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4">Nossa Solução</h3>
                                    <p className="text-gray-400 text-lg leading-relaxed">
                                        Uma plataforma intuitiva que faz o trabalho pesado por você. 
                                        Insights em tempo real para decisões inteligentes.
                                    </p>
                                </div>
                                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                            </div>
                        </div>
                    </div>
                </section>

                <section ref={valuesRef} className="py-24">
                    <div className="container mx-auto px-6">
                        <div className={`grid grid-cols-1 md:grid-cols-3 gap-16 transition-all duration-1000 delay-300 ${
                            valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}>
                            <div className="group text-center">
                                <div className="mb-6 inline-block p-4 rounded-full bg-gray-50 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                    <LuShieldCheck size={32} />
                                </div>
                                <h4 className="font-bold text-xl mb-3">Segurança Privada</h4>
                                <p className="text-gray-500 leading-relaxed">Seus dados são criptografados e nunca compartilhados com terceiros.</p>
                            </div>
                            
                            <div className="group text-center">
                                <div className="mb-6 inline-block p-4 rounded-full bg-gray-50 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                    <LuUsers size={32} />
                                </div>
                                <h4 className="font-bold text-xl mb-3">Foco no Usuário</h4>
                                <p className="text-gray-500 leading-relaxed">Desenvolvido com base no feedback real de quem busca liberdade.</p>
                            </div>

                            <div className="group text-center">
                                <div className="mb-6 inline-block p-4 rounded-full bg-gray-50 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                                    <LuTrendingUp size={32} />
                                </div>
                                <h4 className="font-bold text-xl mb-3">Crescimento</h4>
                                <p className="text-gray-500 leading-relaxed">Ferramentas que evoluem conforme seu patrimônio se expande.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default About;