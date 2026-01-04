import React from 'react'

const InfoCardSkeleton = () => {
   return (
      <div className="flex gap-6 bg-white p-6 rounded-2xl shadow-md shadow-gray-200 border border-gray-200/50 animate-pulse">
        <div className="w-14 h-14 bg-gray-200 rounded-full shrink-0"></div>

        <div className="flex flex-col justify-center">
          <div className="h-3 w-24 bg-gray-100 rounded mb-2"></div>
          <div className="h-6 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
}

export default InfoCardSkeleton