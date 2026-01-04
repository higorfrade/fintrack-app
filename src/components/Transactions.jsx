import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'
import TransactionItemSkeleton from './TransactionItemSkeleton'

const Transactions = ({transactions, type, onMore, title, isLoading}) => {
    if (isLoading) {
        return (
            <div className="card animate-pulse">
                <div className="flex items-center justify-between">
                    <div className="h-6 w-40 bg-gray-200 rounded"></div>
                    <div className="h-8 w-20 bg-gray-300 rounded-lg"></div>
                </div>
                <div className="mt-6 space-y-1">
                    {[...Array(1)].map((_, i) => <TransactionItemSkeleton key={i} />)}
                </div>
            </div>
        );
    }

  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">{title}</h5>
            <button className="card-btn" onClick={onMore}>
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
                    type={type}
                    hideDeleteButton
                />
            ))}
        </div>
    </div>
  )
}

export default Transactions