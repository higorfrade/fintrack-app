import React from 'react'
import { LuPackage, LuPen, LuTrash2 } from 'react-icons/lu'
import TransactionItemSkeleton from './TransactionItemSkeleton';

const CategoryList = ({categories, onEditCategory, hideDeleteButton, onDelete, isLoading}) => {
  if (isLoading) {
    return (
      <div className="card animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-32 bg-gray-200 rounded"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => <TransactionItemSkeleton key={i} isCategory={true} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold">Categorias</h4>
      </div>

      {categories.length === 0 ? (
        <p className="text-gray-500">
          Nenhuma categoria adicionada. Clique em <strong>"+ Adicionar Categoria"</strong> para começar.
        </p>
      ): (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div 
                key={category.id}
                className="group relative flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100/60">
                  <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
                    {category.icon ? (
                      <span className="text-2xl">
                        <img src={category.icon} alt={category.name} className="h-5 w-5" />
                      </span>
                    ): (
                      <LuPackage className="text-black" size={24} />
                    )}
                  </div>

                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-black font-medium">
                        {category.name}
                      </p>
                      <p className="text-sm text-gray-700 mt-1 capitalize">
                        {category.type}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {!hideDeleteButton && (
                        <button
                            onClick={() => onDelete(category.id)}
                            className="text-gray-400 hover:text-black opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <LuTrash2 size={18} />
                        </button>
                      )}
                      <button 
                          onClick={() => onEditCategory(category)}
                          className="text-gray-400 hover:text-black opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <LuPen size={18} />
                      </button>
                    </div>
                  </div>
              </div>
            ))}
          </div>
      )}
    </div>
  )
}

export default CategoryList