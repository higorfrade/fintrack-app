import React, { useEffect, useState } from 'react'
import Dashboard from '../../components/Dashboard';
import { useUser } from '../../hooks/useUser';
import axiosConfig from '../../utils/axiosConfig';
import { API_ENDPOINTS } from '../../utils/apiEndpoints';
import TransactionList from '../../components/TransactionList';
import Modal from '../../components/Modal';
import { LuPlus } from 'react-icons/lu';
import TransactionForm from '../../components/TransactionForm';
import toast from 'react-hot-toast';
import DeleteAlert from '../../components/DeleteAlert';
import TransactionOverview from '../../components/TransactionOverview';

const Income = () => {
  useUser();
  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncome, setOpenAddIncome] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  });

  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);

      if (response.status === 200) {    
        console.log(response.data);
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Ops... Algo deu errado. Por favor, tente novamente.", error);
      toast.error(error.response?.data?.message || "Falha ao buscar os detalhes das receitas.");
    } finally {
      setLoading(false);
    }
  }

  const fetchIncomeCategories = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("receita"));

      if (response.status === 200) {
        console.log("Categorias de receita", response.data);
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Ops... Algo deu errado. Por favor, tente novamente.", error);
      toast.error(error.response?.data?.message || "Falha ao buscar as categorias de receita.");
    }
  }

  const handleAddTransaction = async (income) => {
    const {name, amount, categoryId, date, icon} = income;

    if (!name.trim()) {
      toast.error("Por favor, insira um nome para a receita.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("O valor deve ser um número válido maior que zero.");
      return;
    }

    if (!date) {
      toast.error("Por favor, selecione uma data.");
      return;
    }

    const todayDate = new Date().toISOString().split('T')[0];

    if (date > todayDate) {
      toast.error("Você não pode selecionar uma data futura.");
      return;
    }

    if (!categoryId) {
      toast.error("Por favor, selecione uma categoria.");
      return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
        name,
        amount: Number(amount),
        categoryId,
        date,
        icon
      });

      if (response.status === 201) {
        setOpenAddIncome(false);
        toast.success("Receita adicionada com sucesso.");
        fetchIncomeDetails();
        fetchIncomeCategories();
      }
    } catch (error) {
      console.error("Erro ao adicionar a receita", error);
      toast.error(error.response?.data?.message || "Falha ao adicionar receita.");
    }
  }

  const deleteTransaction = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
      setOpenDeleteAlert({show: false, data: null});
      toast.success("Receita excluida com sucesso.");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Erro ao excluir a receita", error);
      toast.error(error.response?.data?.message || "Falha ao excluir receita.");
    }
  }

  const handleDownloadDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.INCOME_DOWNLOAD, {responseType: "blob"});
      let filename = "receitas.xlsx";
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Download das receitas realizado com sucesso.");
    } catch (error) {
      console.error("Erro ao baixar os detalhes das receitas:", error);
      toast.error(error.response?.data?.message || "Falha ao baixar as receitas.");
    }
  }

  const handleEmailDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EMAIL);

      if (response.status === 200) {
        toast.success("Email com as receitas enviado com sucesso.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Falha ao enviar o email com as receitas.");
    }
  }

  useEffect(() => {
    fetchIncomeDetails();
    fetchIncomeCategories();
  }, []);
  
  return (
    <Dashboard activeMenu="Receita">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            {/* Visão geral das receitas */}
            <TransactionOverview transactions={incomeData} title="Visão geral das Receitas" onAddTransaction={() => setOpenAddIncome(true)} type="receita" />
          </div>

          <TransactionList 
            transactions={incomeData} 
            title={"Receitas"}
            onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
            onDownload={handleDownloadDetails}
            onEmail={handleEmailDetails}
          />

          {/* Adicionar Receitas */}
          <Modal 
            isOpen={openAddIncome}
            onClose={() => setOpenAddIncome(false)}
            title="Adicionar Receita"
          >
            <TransactionForm
              onAddTransaction={(income) => handleAddTransaction(income)}
              categories={categories}
              btnTitle="Adicionar Receita"
            />
          </Modal>

          {/* Deletar Receitas */}
          <Modal 
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({show: false, data: null})}
            title="Excluir Receita"
          >
            <DeleteAlert 
              content="Tem certeza de que deseja excluir esta receita?"
              onDelete={() => deleteTransaction(openDeleteAlert.data)}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  )
}

export default Income;