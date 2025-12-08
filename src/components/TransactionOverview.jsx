import React, { useEffect, useState } from 'react'
import { prepareTransactionLineChartData } from '../utils/utils';
import CustomLineChart from './CustomLineChart';
import { LuPlus } from 'react-icons/lu';

const TransactionOverview = ({transactions, title, onAddTransaction, type}) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareTransactionLineChartData(transactions);
        console.log(result);
        setChartData(result);
        
        return () => {

        }
    }, [transactions]);

  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <div>
                <h5 className="text-lg font-medium">
                    {title}
                </h5>
                <p className="text-xs text-gray-500 mt-0.5">
                    {type === "receita" ? (
                        <>
                            Acompanhe seus ganhos ao longo do tempo e analise as tendências das suas receitas.
                        </>
                    ) : (
                        <>
                            Acompanhe seus ganhos ao longo do tempo e analise as tendências das suas despesas.
                        </>
                    )}
                    
                </p>
            </div>
            <button 
                onClick={onAddTransaction}
                className="add-btn gap-1 rounded-lg py-2 px-3 hover:scale-105 font-medium">
              <LuPlus size={25} className="text-lg" />
              {type === "receita" ? (
                <>
                    Adicionar Receita
                </>
              ) : (
                <>
                    Adicionar Despesa
                </>
              )}
            </button>
        </div>

        <div className="mt-10">
            <CustomLineChart data={chartData} />
        </div>
    </div>
  )
}

export default TransactionOverview