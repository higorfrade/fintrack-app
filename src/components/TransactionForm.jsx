import React, { useEffect, useState } from 'react'
import EmojiPickerPopup from './EmojiPickerPopup';
import Input from './Input';
import { LuLoaderCircle } from 'react-icons/lu';

const TransactionForm = ({onAddTransaction, categories, btnTitle}) => {
    const [loading, setLoading] = useState(false);
    const [transaction, setTransaction] = useState({
        name: "",
        amount: "",
        icon: "",
        date: "",
        categoryId: categories.length > 0 ? categories[0].id : ""
    });

    const categoryOptions = categories.map(category => ({
        value: category.id,
        label: category.name
    }));

    const handleChange = (key, value) => {
        setTransaction({...transaction, [key]: value});
    }

    const handleAddTransaction = async () => {
        setLoading(true);

        try {
            await onAddTransaction(transaction);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (categories.length > 0 && !transaction.categoryId) {
            setTransaction(prev => ({...prev, categoryId: categories[0].id}));
        }
    }, [categories]);

  return (
    <div>
        <Input 
            value={transaction.name}
            onChange={({target}) => handleChange("name", target.value)}
            label="Receita"
            placeholder="Ex: Salário, Conta de luz, Freelance, Mercado"
            type="text"
        />

        <Input
            value={transaction.amount}
            onChange={({target}) => handleChange("amount", target.value)}
            label="Valor"
            placeholder="Ex: 100.000 "
            type="number"
        />

        <Input
            label="Categoria"
            value={transaction.categoryId}
            onChange={({target}) => handleChange("categoryId", target.value)}
            isSelect={true}
            options={categoryOptions}
        />

        <Input 
            value={transaction.date}
            onChange={({target}) => handleChange("date", target.value)}
            label="Data"
            placeholder=""
            type="date"
        />

        <EmojiPickerPopup
            icon={transaction.icon}
            onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
        />

        <div className="flex justify-end mt-6">
            <button 
                onClick={handleAddTransaction}
                disabled={loading}
                className="add-btn-static">
                    {loading ? (
                        <>
                            <LuLoaderCircle className="w-4 h-4 animate-spin" />
                        </>
                    ) : (
                        <>
                            {btnTitle}
                        </>
                    )}
            </button>
        </div>
    </div>
  )
}

export default TransactionForm