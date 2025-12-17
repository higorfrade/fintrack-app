import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'

const RecentTransactions = ({transactions, onMoreTransaction}) => {
  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <h4 className="text-lg">Transações recentes</h4>

            <button className="card-btn" onClick={onMoreTransaction}>
                Mais <LuArrowRight className="text-base" size={15} />
            </button>
        </div>

        <div className="mt-6">
            {transactions?.slice(0, 5)?.map(item => (
                <TransactionInfoCard 
                    key={item.id}
                    title={item.name}
                    icon={item.icon}
                    date={moment(item.date).format("DD MMM YYYY")}
                    amount={item.amount}
                    type={item.type}
                    hideDeleteButton
                />
            ))}
        </div>
    </div>
  )
}

export default RecentTransactions