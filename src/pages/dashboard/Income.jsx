import React from 'react'
import Dashboard from '../../components/Dashboard';
import { useUser } from '../../hooks/useUser';
const Income = () => {
  useUser();
  
  return (
    <Dashboard activeMenu="Receita">
      Income page
    </Dashboard>
  )
}

export default Income;