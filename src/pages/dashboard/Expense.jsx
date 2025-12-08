import React, { useEffect, useState } from 'react'
import Dashboard from '../../components/Dashboard';
import { useUser } from '../../hooks/useUser';
import axiosConfig from '../../utils/axiosConfig';
import { API_ENDPOINTS } from '../../utils/apiEndpoints';
import toast from 'react-hot-toast';
import TransactionOverview from '../../components/TransactionOverview';
import TransactionList from '../../components/TransactionList';
import Modal from '../../components/Modal';
import TransactionForm from '../../components/TransactionForm';
import DeleteAlert from '../../components/DeleteAlert';

const Expense = () => {
  useUser();
  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpense, setOpenAddExpense] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  })

  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);

      if (response.status === 200) {
        console.log(response.data);
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Ops... Algo deu errado. Por favor, tente novamente.", error);
      toast.error(error.response?.data?.message || "Falha ao buscar os detalhes das despesas.");
    } finally {
      setLoading(false);
    }
  }

  const fetchExpenseCategories = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("despesa"));

      if (response.status === 200) {
        console.log("Categorias de despesa", response.data);
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Ops... Algo deu errado. Por favor, tente novamente.", error);
      toast.error(error.response?.data?.message || "Falha ao buscar as categorias de despesa.");
    }
  }

  const handleAddTransaction = async (expense) => {
    const {name, amount, categoryId, date, icon} = expense;

    if (!name.trim()) {
      toast.error("Por favor, insira um nome para a despesa.");
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
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
        name,
        amount: Number(amount),
        categoryId,
        date,
        icon
      });

      if (response.status === 201) {
        setOpenAddExpense(false);
        toast.success("Despesa adicionada com sucesso.");
        fetchExpenseDetails();
        fetchExpenseCategories();
      }
    } catch (error) {
      console.error("Erro ao adicionar a despesa", error);
      toast.error(error.response?.data?.message || "Falha ao adicionar despesa.");
    }
  }

  const deleteTransaction = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
      setOpenDeleteAlert({show: false, data: null});
      toast.success("Despesa excluida com sucesso.");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Erro ao excluir a despesa", error);
      toast.error(error.response?.data?.message || "Falha ao excluir despesa.");
    }
  }

  const handleDownloadDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_DOWNLOAD, {responseType: "blob"});
      let filename = "despesas.xlsx";
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Download das despesas realizado com sucesso.");
    } catch (error) {
      console.error("Erro ao baixar os detalhes das despesas:", error);
      toast.error(error.response?.data?.message || "Falha ao baixar as despesas.");
    }
  }

  const handleEmailDetails = async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EMAIL);

      if (response.status === 200) {
        toast.success("Email com as despesas enviado com sucesso.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Falha ao enviar o email com as despesas.");
    }
  }

  useEffect(() => {
    fetchExpenseDetails();
    fetchExpenseCategories();
  }, []);
  
  return (
    <Dashboard activeMenu="Despesa">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            {/* Visão geral das despesas */}
            <TransactionOverview transactions={expenseData} title="Visão geral das Despesas" onAddTransaction={() => setOpenAddExpense(true)} type="despesa" />
          </div>

          <TransactionList
            transactions={expenseData}
            title={"Despesas"}
            onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
            onDownload={handleDownloadDetails}
            onEmail={handleEmailDetails}
          />

          {/* Adicionar Despesas */}
          <Modal
            isOpen={openAddExpense}
            onClose={() => setOpenAddExpense(false)}
            title={"Adicionar Despesa"}
          >
            <TransactionForm
              onAddTransaction={(expense) => handleAddTransaction(expense)}
              categories={categories}
              btnTitle="Adicionar Despesa"
            />
          </Modal>

          {/* Deletar Despesas */}
          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({show: false, data: null})}
            title="Excluir Despesa"
          >
            <DeleteAlert
              content="Tem certeza de que deseja excluir esta despesa?"
              onDelete={() => deleteTransaction(openDeleteAlert.data)}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  )
}

export default Expense;