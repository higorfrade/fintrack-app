import React from 'react'

const TransactionItemSkeleton = ({isCategory = false}) => {
  return (
    <div className="flex items-center gap-4 p-3 mt-2">
      <div className="w-12 h-12 bg-gray-100 rounded-full shrink-0"></div>

      <div className="flex flex-1 items-center justify-between">
        <div>
          <div className="h-4 w-28 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 w-16 bg-gray-100 rounded"></div>
        </div>
        {!isCategory ? (
          <div className="h-7 w-20 bg-gray-100 rounded-md"></div>
        ) : (
          <div className="flex gap-2">
            <div className="h-4 w-4 bg-gray-50 rounded"></div>
            <div className="h-4 w-4 bg-gray-50 rounded"></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TransactionItemSkeleton