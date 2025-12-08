import React, { useEffect, useState } from 'react'
import { LuDownload, LuLoaderCircle, LuMail } from 'react-icons/lu'
import TransactionInfoCard from './TransactionInfoCard'
import moment from 'moment'
import axiosConfig from '../utils/axiosConfig'
import { API_ENDPOINTS } from '../utils/apiEndpoints'

const TransactionList = ({transactions, title, onDelete, onDownload, onEmail}) => {
    const [categories, setCategories] = useState([]);
    const [emailing, setEmailing] = useState(false);
    const [downloading, setDownloading] = useState(false);

    const fetchCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
            setCategories(response.data);
        } catch (error) {
            console.error("Erro ao carregar categorias", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const getCategoryType = (categoryId) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category ? category.type : "despesa";
    };

    const handleDownload = async () => {
        setDownloading(true); 
        try {
            await onDownload();
        } finally {
            setDownloading(false);
        }
    }

    const handleEmail = async () => {
        setEmailing(true);
        try {
            await onEmail();
        } finally {
            setEmailing(false);
        }
    }

  return (
    <div className="card">
        <div className="flex items-center justify-between">
            <h5 className="text-lg">
                {title}
            </h5>
            <div className="flex items-center justify-end gap-2">
                <button 
                    disabled={emailing}
                    className="card-btn gap-2" onClick={handleEmail}>
                        {emailing ? (
                            <>
                                <LuLoaderCircle className="w-4 h-4 animate-spin" />
                                Enviando...
                            </>
                        ) : (
                            <>
                                <LuMail size={18} className="text-base" />
                                Email
                            </>
                        )}
                </button>
                <button 
                    disabled={downloading}
                    className="card-btn gap-2" onClick={handleDownload}>
                        {downloading ? (
                            <>
                                <LuLoaderCircle className="w-4 h-4 animate-spin" />
                                Baixando...
                            </>
                        ) : (
                            <>
                                <LuDownload size={18} className="text-base" />
                                Download
                            </>
                        )}
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Mostrar as transações */}
            {transactions?.map((transaction) => (
                <TransactionInfoCard 
                    key={transaction.id}
                    title={transaction.name}
                    icon={transaction.icon}
                    date={moment(transaction.date).format('DD MMM YYYY')}
                    amount={transaction.amount}
                    type={getCategoryType(transaction.categoryId)}
                    onDelete={() => onDelete(transaction.id)}
                />
            ))}
        </div>
    </div>
  )
}

export default TransactionList