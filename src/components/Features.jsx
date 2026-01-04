import React from 'react'
import { LuCalendarDays, LuChartNoAxesCombined, LuChartPie, LuLayoutDashboard } from 'react-icons/lu';

const features = [
    {
        title: "Controle Simples",
        desc: "Interface intuitiva para registrar gastos e receitas em segundos.",
        icon: <LuLayoutDashboard className="w-8 h-8 text-black" />
    },
    {
        title: "Tempo Real",
        desc: "Acompanhe seu progresso financeiro e saldo instantaneamente.",
        icon: <LuChartNoAxesCombined className="w-8 h-8 text-black" />
    },
    {
        title: "Orçamento Mensal",
        desc: "Planeje seus gastos e evite surpresas no fim do mês.",
        icon: <LuCalendarDays className="w-8 h-8 text-black" />
    },
    {
        title: "Relatórios",
        desc: "Receba relatórios personalizados para melhorar sua saúde financeira.",
        icon: <LuChartPie className="w-8 h-8 text-black" />
    }
];

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Tudo o que você precisa para prosperar</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Ferramentas poderosas para quem leva o dinheiro a sério.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="bg-gray-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features