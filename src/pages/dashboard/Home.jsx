import React, { useEffect, useState } from 'react'
import Dashboard from '../../components/Dashboard';
import { useUser } from '../../hooks/useUser';
import InfoCard from '../../components/InfoCard';
import { addThousandSeparator } from '../../utils/utils';
import { LuHandCoins, LuPiggyBank, LuWallet } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../../utils/axiosConfig';
import { API_ENDPOINTS } from '../../utils/apiEndpoints';
import toast from 'react-hot-toast';
import RecentTransactions from '../../components/RecentTransactions';
import FinanceOverview from '../../components/FinanceOverview';
import Transactions from '../../components/Transactions';

const Home = () => {
  useUser();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);

      if (response.status === 200) {
        setDashboardData(response.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Falha ao carregar os dados do dashboard. Por favor, tente novamente.")
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardData();

    return () => {};
  }, []);

  return (
    <div>
      <Dashboard activeMenu="Dashboard">
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard 
              icon={<LuPiggyBank />}
              label="Balança Total"
              value={addThousandSeparator(dashboardData?.totalBalance || 0)}
              color="bg-[#3A3A3A]"
              isLoading={loading}
            />

            <InfoCard 
              icon={<LuWallet />}
              label="Total de Receitas"
              value={addThousandSeparator(dashboardData?.totalIncome || 0)}
              color="bg-[#2ECC71]"
              isLoading={loading}
            />

            <InfoCard 
              icon={<LuHandCoins />}
              label="Total de Despesas"
              value={addThousandSeparator(dashboardData?.totalExpense || 0)}
              color="bg-[#E74C3C]"
              isLoading={loading}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <RecentTransactions 
              transactions={dashboardData?.recentTransactions}
              isLoading={loading}
            />

            <FinanceOverview 
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpense || 0}
              isLoading={loading}
            />

            <Transactions 
              transactions={dashboardData?.recent5Incomes || []}
              type="receita"
              onMore={() => navigate("/income")}
              title="Receitas recentes"
              isLoading={loading}
            />

            <Transactions 
              transactions={dashboardData?.recent5Expenses || []}
              type="despesa"
              onMore={() => navigate("/expense")}
              title="Despesas recentes"
              isLoading={loading}
            />
          </div>
        </div>
      </Dashboard>
    </div>
  )
}

export default Home;