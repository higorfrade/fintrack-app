import React from 'react'
import { LuChartArea, LuTrash2, LuTrendingDown, LuTrendingUp } from 'react-icons/lu';
import { addThousandSeparator } from '../utils/utils';

const TransactionInfoCard = ({icon, title, date, amount, type, hideDeleteButton, onDelete}) => {
    const getAmountStyles = () => type === "receita" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800";

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">
        <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
            {icon ? (
                <img src={icon} alt={title} className="w-6 h-6" />
            ) : (
                <LuChartArea className="text-black" />
            )}
        </div>

        <div className="flex flex-1 items-center justify-between">
            <div>
                <p className="text-sm text-black font-medium">{title}</p>
                <p className="text-xs text-gray-400 mt-1">{date}</p>
            </div>
            <div className="flex items-center gap-2">
                {!hideDeleteButton && (
                    <button 
                        onClick={onDelete}
                        className="text-gray-400 hover:text-black opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <LuTrash2 size={18} />
                    </button>
                )}

                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
                    <h6 className="text-xs font-medium">
                        {type === "receita" ? "+" : "-"} ${addThousandSeparator(amount)}
                    </h6>
                    {type === "receita" ? (
                        <LuTrendingUp size={15} />
                    ) : (
                        <LuTrendingDown size={15} />
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default TransactionInfoCard