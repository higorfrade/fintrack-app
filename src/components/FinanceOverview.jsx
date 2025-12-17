import React from 'react'
import CustomPieChart from './CustomPieChart';
import { addThousandSeparator } from '../utils/utils';

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {
    const colors = ["#3A3A3A", "#2ECC71", "#E74C3C"]
    const balanceData = [
        {name: "Balança Total", amount: totalBalance},
        {name: "Total de Receitas", amount: totalIncome},
        {name: "Total de Despesas", amount: totalExpense}
    ];

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