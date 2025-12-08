import React, { useEffect, useState } from 'react'
import Input from './Input'
import EmojiPickerPopup from './EmojiPickerPopup'
import { LuLoaderCircle } from 'react-icons/lu'

const CategoryForm = ({onAddCategory, onEditCategory, initialCategoryData, isEditing}) => {
    const [category, setCategory] = useState({
        name: "",
        type: "receita",
        icon: ""
    })

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditing && initialCategoryData) {
            setCategory(initialCategoryData);
        } else {
            setCategory({name: "", type: "receita", icon: ""})
        }
    }, [isEditing, initialCategoryData])

    const categoryTypeOptions = [
        {value: "receita", label: "Receita"},
        {value: "despesa", label: "Despesa"}
    ]

    const handleChange = (key, value) => {
        setCategory({...category, [key]: value})
    }

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (isEditing) {
                await onEditCategory(category);
            } else {
                await onAddCategory(category);
            }
            
        } finally {
            setLoading(false);
        }
        
    }

  return (
    <div className="p-4">
        <Input
            value={category.name}
            onChange={({target}) => handleChange("name", target.value)}
            label="Nome da categoria"
            placeholder="Ex: Salario, Bonus, Aluguel, Contas..."
            type="text"
        />

        <Input 
            label="Tipo da categoria"
            value={category.type}
            onChange={({target}) => handleChange("type", target.value)}
            isSelect={true}
            options={categoryTypeOptions}
        />
        
        <EmojiPickerPopup
            icon={category.icon}
            onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />

        <div className="flex justify-end mt-6">
            <button 
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="add-btn-static">
                {loading ? (
                    <>
                        <LuLoaderCircle className="w-4 h-4 animate-spin" />
                        {isEditing ? "Atualizando..." : "Adicionando..."}
                    </>
                ) : (
                    <>
                        {isEditing ? "Atualizar Categoria" : "Adicionar Categoria"}
                    </>
                )}
            </button>
        </div>
    </div>
  )
}

export default CategoryForm