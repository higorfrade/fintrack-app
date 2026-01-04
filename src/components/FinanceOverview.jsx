import React from 'react'
import CustomPieChart from './CustomPieChart';
import { addThousandSeparator } from '../utils/utils';

const FinanceOverview = ({totalBalance, totalIncome, totalExpense, isLoading}) => {
    const colors = ["#3A3A3A", "#2ECC71", "#E74C3C"]
    const balanceData = [
        {name: "Balança Total", amount: totalBalance},
        {name: "Total de Receitas", amount: totalIncome},
        {name: "Total de Despesas", amount: totalExpense}
    ];

    if (isLoading) {
        return (
            <div className="card animate-pulse">
                <div className="flex items-center justify-between">
                    <div className="h-6 w-56 bg-gray-200 rounded"></div>
                </div>
                
                <div className="flex flex-col items-center justify-center" style={{ height: '380px' }}>
                    <div className="relative flex items-center justify-center">
                        <div className="w-64 h-64 border-25 border-gray-100 rounded-full flex flex-col items-center justify-center">
                            <div className="h-3 w-20 bg-gray-50 rounded mb-2"></div>
                            <div className="h-6 w-32 bg-gray-100 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">Visão geral das Finanças</h5>
        </div>
        
        <CustomPieChart 
            data={balanceData}
            label="Balança Total"
            totalAmount={`${addThousandSeparator(totalBalance)}`}
            colors={colors}
            showTextAnchor
        />
    </div>
  )
}

export default FinanceOverview