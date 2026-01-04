import React from 'react'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'
import TransactionItemSkeleton from './TransactionItemSkeleton';

const RecentTransactions = ({transactions, isLoading}) => {
    if (isLoading) {
        return (
            <div className="card animate-pulse">
                <div className="flex items-center justify-between">
                    <div className="h-6 w-48 bg-gray-200 rounded"></div>
                </div>
                <div className="mt-6 space-y-2">
                    {[...Array(3)].map((_, i) => <TransactionItemSkeleton key={i} />)}
                </div>
            </div>
        );
    }

  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <h4 className="text-lg">Transações recentes</h4>
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