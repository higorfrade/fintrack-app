import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/Home.jsx";
import Income from "./pages/dashboard/Income.jsx";
import Expense from "./pages/dashboard/Expense.jsx";
import Category from "./pages/dashboard/Category.jsx";
import Filter from "./pages/dashboard/Filter.jsx";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import LandingPage from "./pages/landing/LandingPage.jsx";
import { Toaster } from "react-hot-toast";
import About from "./pages/landing/About.jsx";
import Contact from "./pages/landing/Contact.jsx";
import Terms from "./pages/landing/Terms.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import Profile from "./pages/dashboard/Profile.jsx";


const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />

          <Route path="/dashboard" element={<Home />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/category" element={<Category />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/home" />
  )
}

export default App;