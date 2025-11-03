import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import Input from '../../components/Input';
import CustomPhoneInput from '../../components/PhoneInput';
import { validateEmail, validatePassword } from '../../utils/validation';
import axiosConfig from '../../utils/axiosConfig';
import { API_ENDPOINTS } from '../../utils/apiEndpoints';
import toast from 'react-hot-toast';
import { LuLoaderCircle } from 'react-icons/lu';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name.trim()) {
      setError("Por favor, informe seu nome completo")
      setIsLoading(false)
      return;
    }

    if (!validateEmail(email)) {
      setError("Por favor, insira um email válido")
      setIsLoading(false)
      return;
    }

    if (!password.trim()) {
      setError("Por favor, insira uma senha")
      setIsLoading(false)
      return;
    }

    if (!validatePassword(password, confirmPassword)) {
      setError("As senhas não coincidem")
      setIsLoading(false)
      return;
    }

    setError("");

    // Chamada da API de Registro
    try {
      const res = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
        name,
        phoneNumber,
        email,
        password
      });
      if (res.status === 201) {
        toast.success("Conta criada com sucesso.");
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403 || error.response.status === 409) {
          toast.error("Já existe uma conta cadastrada com este email.");
        }
      } else {
          console.error("Ops... Algo deu errado.", error);
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
              Criar uma conta
            </h3>
            <p className="text-sm text-slate-700 text-center mb-6">
              Gerencie as suas economias com a nossa plataforma.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-center mb-6">
                {/* Imagem de Perfil */}
              </div>
              <div className="grid gap-1">
                <Input 
                    label="Nome completo"
                    placeholder="Digite seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                />

                <CustomPhoneInput
                    label="Celular (Opcional)"
                    value={phoneNumber}
                    onChange={(value) => setPhoneNumber(value)}
                />

                <Input 
                    label="Email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                />

                <Input 
                    label="Senha"
                    placeholder="Digite uma senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                />

                <Input 
                  label="Confirme sua senha"
                  placeholder="Repita a senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                    Registrando...
                  </>
                ): (
                  "Registrar"
                )}
              </button>

              <p className="flex gap-1 justify-center items-center text-sm text-slate-800 text-center mt-6">
                Já tem uma conta?
                <Link to="/login" className="font-medium text-link">Entrar</Link>
              </p>
            </form>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Signup;