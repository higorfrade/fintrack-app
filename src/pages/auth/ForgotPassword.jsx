import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Input from '../../components/Input';
import axiosConfig from '../../utils/axiosConfig';
import { API_ENDPOINTS } from '../../utils/apiEndpoints';
import { LuLoaderCircle, LuArrowLeft } from 'react-icons/lu';
import { validateEmail } from '../../utils/validation';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    if (!validateEmail(email)) {
        setError("Por favor, insira um email válido")
        setIsLoading(false)
        return;
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.FORGOT_PASSWORD, { 
        email: email });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Ocorreu um erro ao processar sua solicitação.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='h-screen w-full flex items-center justify-center bg-linear-to-br from-[#121212] via-[#1F1F1F] to-[#121212]'>
      <div className="w-full max-w-lg px-6">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <Link to="/login" className="flex items-center gap-2 text-sm text-slate-600 mb-6 hover:text-black transition-colors">
            <LuArrowLeft /> Voltar para o Login
          </Link>
          
          <h3 className="text-2xl font-semibold text-black mb-2">Recuperar senha</h3>
          <p className="text-sm text-slate-700 mb-6">Insira seu e-mail para receber o link de redefinição de senha.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              label="Email"
              placeholder="Digite seu e-mail cadastrado"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />

            {message && <p className="text-green-700 text-sm text-center bg-green-50 p-3 rounded">{message}</p>}
            {error && <p className="text-red-800 text-sm text-center bg-red-50 p-3 rounded">{error}</p>}

            <button disabled={isLoading} className="btn-primary w-full py-3 flex justify-center items-center font-medium gap-2">
              {isLoading ? <LuLoaderCircle className="animate-spin w-5 h-5" /> : "Enviar link de recuperação"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;