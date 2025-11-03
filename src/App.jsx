import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/Home.jsx";
import Income from "./pages/dashboard/Income.jsx";
import Expense from "./pages/dashboard/Expense.jsx";
import Category from "./pages/dashboard/Category.jsx";
import Filter from "./pages/dashboard/Filter.jsx";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import { Toaster } from "react-hot-toast";


const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/category" element={<Category />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;