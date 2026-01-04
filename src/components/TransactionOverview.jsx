import React, { useMemo } from 'react'
import { prepareTransactionLineChartData } from '../utils/utils';
import CustomLineChart from './CustomLineChart';
import { LuPlus } from 'react-icons/lu';

const TransactionOverview = ({transactions, title, onAddTransaction, type, isLoading}) => {

    const chartData = useMemo(() => {
        if (isLoading || !transactions || transactions.length === 0) {
            return [];
        }

        const result = prepareTransactionLineChartData(transactions);
        console.log("Dados do gráfico", result);

        return result;
    }, [transactions, isLoading]);

    if (isLoading) {
        return (
            <div className="card animate-pulse">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="h-7 w-64 bg-gray-200 rounded"></div>
                        <div className="h-4 w-96 bg-gray-100 rounded mt-0.5"></div>
                    </div>
                    <div className="h-11 w-48 bg-gray-300 rounded-lg"></div>
                </div>
                <div className="mt-10 h-72 w-full bg-gray-50 rounded-lg"></div>
            </div>
        );
    }

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