import React, { useState } from 'react'
import Dashboard from '../../components/Dashboard';
import { useUser } from '../../hooks/useUser';
import { LuSearch } from 'react-icons/lu';
import axiosConfig from '../../utils/axiosConfig';
import { API_ENDPOINTS } from '../../utils/apiEndpoints';
import toast from 'react-hot-toast';
import TransactionInfoCard from '../../components/TransactionInfoCard';
import moment from 'moment';

const Filter = () => {
  useUser();
  const [type, setType] = useState("receita");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [keyword, setKeyword] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTER, {
        type,
        startDate,
        endDate,
        sortField,
        sortOrder,
        keyword
      });
      setTransactions(response.data);
    } catch (error) {
      console.error("Ops... Algo deu errado. Por favor, tente novamente.", error);
      toast.error(error.response?.data?.message || "Falha ao carregar as transações. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <Dashboard activeMenu="Filtro">
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Filtro de Transações</h2>
        </div>
        <div className="card p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold">Selecione os filtros</h5>
          </div>
          <form className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-1">Tipo</label>
              <select value={type} id="type" className="w-full border rounded px-3 py-2" onChange={e => setType(e.target.value)}>
                <option value="receita">Receita</option>
                <option value="despesa">Despesa</option>
              </select>
            </div>
            <div>
              <label htmlFor="startdate" className="block text-sm font-medium mb-1">Data Inicial</label>
              <input value={startDate} id="startdate" type="date" className="w-full border rounded px-3 py-2" onChange={e => setStartDate(e.target.value)} />
            </div>
            <div>
              <label htmlFor="enddate" className="block text-sm font-medium mb-1">Data Final</label>
              <input value={endDate} id="enddate" type="date" className="w-full border rounded px-3 py-2" onChange={e => setEndDate(e.target.value)} />
            </div>
            <div>
              <label htmlFor="sortfield" className="block text-sm font-medium mb-1">Ordenar por</label>
              <select value={sortField} id="sortfield" className="w-full border rounded px-3 py-2" onChange={e => setSortField(e.target.value)}>
                <option value="date">Data</option>
                <option value="amount">Valor</option>
                <option value="category">Categoria</option>
              </select>
            </div>
            <div>
              <label htmlFor="sortorder" className="block text-sm font-medium mb-1">Ordem</label>
              <select value={sortOrder} id="sortorder" className="w-full border rounded px-3 py-2" onChange={e => setSortOrder(e.target.value)}>
                <option value="asc">Crescente</option>
                <option value="desc">Decrescente</option>
              </select>
            </div>
            <div className="sm:col-span-1 md:col-span-1 flex items-end">
              <div className="w-full">
                <label htmlFor="keyword" className="block text-sm font-medium mb-1">Buscar</label>
                <input value={keyword} id="keyword" type="text" placeholder="Palavra-chave..." className="w-full border rounded px-3 py-2" onChange={e => setKeyword(e.target.value)} />
              </div>
              <button onClick={handleSearch} className="flex items-center justify-center ml-2 mb-1 p-2 bg-black hover:bg-black/80 text-white rounded cursor-pointer">
                <LuSearch size={20} />
              </button>
            </div>
          </form>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-semibold">Transações</h5>
          </div>
          {transactions.length === 0 && !loading? (
            <p className="text-gray-500">Selecione os filtros e clique no ícone de lupa para aplicar e buscar as transações.</p>
          ) : ""}
          {loading ? (
            <p className="text-gray-500">Carregando as transações</p>
          ) : ""}
          {transactions.map((transaction) => (
            <TransactionInfoCard
              key={transaction.id}
              title={transaction.name}
              icon={transaction.icon}
              date={moment(transaction.date).format("DD MMM YYYY")}
              amount={transaction.amount}
              type={type}
              hideDeleteButton
            />
          ))}
        </div>
      </div>
    </Dashboard>
  )
}

export default Filter;