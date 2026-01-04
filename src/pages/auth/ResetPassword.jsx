import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axiosConfig from '../../utils/axiosConfig';
import { API_ENDPOINTS } from '../../utils/apiEndpoints';
import Input from '../../components/Input';
import { LuLoaderCircle } from 'react-icons/lu';
import { validatePassword } from '../../utils/validation';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!validatePassword(password, confirmPassword)) {
        setError("As senhas não coincidem")
        setIsLoading(false)
        return;
    }

    setError("");

    try {
      await axiosConfig.post(API_ENDPOINTS.RESET_PASSWORD, { 
        token: token, 
        password: password 
      });
      
      alert("Senha alterada com sucesso! Faça login com sua nova senha.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "O link de recuperação é inválido ou expirou.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='h-screen w-full flex items-center justify-center bg-linear-to-br from-[#121212] via-[#1F1F1F] to-[#121212]'>
       <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
          <h3 className="text-2xl font-bold mb-4">Nova Senha</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              label="Nova Senha" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <Input 
              label="Confirmar Senha" 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
            />
            
            {error && <p className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">{error}</p>}

            <button disabled={isLoading} className="btn-primary w-full py-3 flex justify-center font-medium items-center gap-2">
              {isLoading ? <LuLoaderCircle className="animate-spin w-5 h-5" /> : "Redefinir Senha"}
            </button>
          </form>
       </div>
    </div>
  );
};

export default ResetPassword;