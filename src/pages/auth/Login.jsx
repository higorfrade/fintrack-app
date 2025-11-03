import React, { useContext, useState } from 'react'
import { data, Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import Input from '../../components/Input';
import axiosConfig from '../../utils/axiosConfig';
import { API_ENDPOINTS } from '../../utils/apiEndpoints';
import { AppContext } from '../../context/AppContext';
import { LuLoaderCircle } from 'react-icons/lu';
import { validateEmail } from '../../utils/validation';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {setUser} = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateEmail(email)) {
          setError("Por favor, insira um email válido")
          setIsLoading(false)
          return;
        }
    
        if (!password.trim()) {
          setError("Por favor, insira sua senha")
          setIsLoading(false)
          return;
        }
    
        setError("");

        // Chamada da API de Login
        try {
          const res = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
            email,
            password
          });
          const {token, user} = res.data;
          if (token) {
            localStorage.setItem("token", token);
            setUser(user);
            navigate("/dashboard");
          }
        } catch (error) {
          if (error.response && error.response.data.message) {
            setError(error.response.data.message)
          } else {
            console.error("Ops... Algo deu errado", error);
            setError(error.message);
          }
          
        } finally {
          setIsLoading(false);
        }
  }

  return (
    <div className='h-screen w-full relative flex items-center justify-center overflow-hidden'>
      <div className="w-full h-full bg-linear-to-br from-[#121212] via-[#1F1F1F] to-[#121212] flex items-center justify-center">

        <div className="relative z-10 w-full max-w-lg px-6">

          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[95vh] overflow-y-auto">
            <img src={assets.fintrack_logo} alt="Fintrack Logo" className="w-[40%] mx-auto mb-6 h-auto" />
            <h3 className="text-2xl font-semibold text-black text-center mb-2">
              Entre na sua conta
            </h3>
            <p className="text-sm text-slate-700 text-center mb-6">
              Por favor, insira os seus dados de login.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-1">
                <Input 
                    label="Email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                />

                <Input 
                    label="Senha"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />
              </div>
              {error && (
                <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                  {error}
                </p>
              )}

              <button disabled={isLoading} className={`btn-primary w-full py-3 text-lg font-medium flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed': ''}`} type="submit">
                {isLoading ? (
                  <>
                    <LuLoaderCircle className="animate-spin w-5 h-5" />
                    Entrando...
                  </>
                ): (
                  "Entrar"
                )}
              </button>

              <p className="flex gap-1 justify-center items-center text-sm text-slate-800 text-center mt-6">
                Ainda não tem uma conta?
                <Link to="/signup" className="font-medium text-link">Registre-se</Link>
              </p>
            </form>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Login;