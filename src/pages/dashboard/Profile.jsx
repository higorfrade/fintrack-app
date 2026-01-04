import React, { useState, useContext, useRef, useEffect } from 'react';
import Dashboard from '../../components/Dashboard';
import { AppContext } from '../../context/AppContext';
import { 
    LuCamera, LuMail, LuPhone, LuUser, LuLoaderCircle, 
    LuCalendar, LuTrash2, LuX,
    LuTriangleAlert, 
} from 'react-icons/lu';
import uploadProfileImage from '../../utils/uploadProfileImage';
import axiosConfig from '../../utils/axiosConfig';
import toast from 'react-hot-toast';
import { API_ENDPOINTS } from '../../utils/apiEndpoints';
import { useUser } from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    useUser();
    const { user, setUser, clearUser } = useContext(AppContext);
    const navigate = useNavigate();
    
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({ name: '', phoneNumber: '' });
    const [isUploading, setIsUploading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [confirmEmail, setConfirmEmail] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (user) {
            setFormData({ name: user.name, phoneNumber: user.phoneNumber || '' });
        }
    }, [user]);

    if (!user) {
        return (
            <Dashboard activeMenu="Perfil">
                <div className="flex items-center justify-center h-[60vh]">
                    <LuLoaderCircle className="animate-spin text-black w-10 h-10" />
                </div>
            </Dashboard>
        );
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setIsUploading(true);
        const toastId = toast.loading("Enviando imagem...");
        try {
            const imageUrl = await uploadProfileImage(file);
            const res = await axiosConfig.put(API_ENDPOINTS.UPDATE_PROFILE_IMAGE, { imageUrl });
            if (res.status === 200) {
                setUser(res.data);
                toast.success("Foto atualizada!", { id: toastId });
            }
        } catch (error) {
            toast.error("Erro no upload.", { id: toastId });
        } finally {
            setIsUploading(false);
        }
    };

    const handleUpdateProfile = async () => {
        setIsSaving(true);
        try {
            const res = await axiosConfig.put(API_ENDPOINTS.UPDATE_PROFILE, formData);
            if (res.status === 200) {
                setUser(res.data);
                setIsEditing(false);
                toast.success("Perfil atualizado!");
            }
        } catch (error) {
            toast.error("Erro ao salvar alterações.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (confirmEmail !== user.email) return toast.error("O e-mail não confere.");
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_ACCOUNT);
            toast.success("Conta excluída com sucesso.");
            localStorage.clear();
            clearUser();
            navigate("/home");
        } catch (error) {
            toast.error("Erro ao excluir conta.");
        }
    };

    return (
        <Dashboard activeMenu="Perfil">
            <div className="max-w-4xl mx-auto py-10 px-6">
                <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-10">
                    <div className="relative group">
                        <div className="w-40 h-40 rounded-[2.5rem] bg-gray-50 overflow-hidden border-4 border-white shadow-xl flex items-center justify-center relative">
                            {user.profileImageUrl ? (
                                <img src={user.profileImageUrl} alt="Perfil" className={`w-full h-full object-cover ${isUploading ? 'opacity-30' : 'opacity-100'}`} />
                            ) : (
                                <LuUser className="text-gray-300 w-20 h-20" />
                            )}
                            {isUploading && <LuLoaderCircle className="animate-spin text-black absolute w-10 h-10" />}
                        </div>
                        <button onClick={() => fileInputRef.current.click()} className="absolute -bottom-2 -right-2 bg-black text-white p-4 rounded-2xl shadow-lg hover:scale-110 transition-transform cursor-pointer">
                            <LuCamera size={20} />
                        </button>
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="space-y-2">
                                <h2 className="text-4xl font-extrabold text-black">{user.name}</h2>
                                <p className="text-gray-500 font-medium flex items-center justify-center md:justify-start gap-2">
                                    <LuMail size={18} /> {user.email}
                                </p>
                                <div className="pt-2">
                                    <span className="bg-gray-100 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest text-black flex items-center justify-center md:justify-start gap-2 w-fit mx-auto md:mx-0">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        Conta Ativa
                                    </span>
                                </div>
                            </div>
                            <button 
                                onClick={() => isEditing ? handleUpdateProfile() : setIsEditing(true)}
                                disabled={isSaving}
                                className={`px-8 py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center cursor-pointer gap-2 ${isEditing ? 'bg-black text-white shadow-lg' : 'bg-gray-100 text-black hover:bg-gray-200'}`}
                            >
                                {isSaving ? <LuLoaderCircle className="animate-spin" /> : (isEditing ? 'Salvar Perfil' : 'Editar Dados')}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                    <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-bold mb-6">Informações da Conta</h3>
                        <div className="space-y-6">
                            <EditableItem icon={<LuUser />} label="Nome Completo" value={formData.name} isEditing={isEditing} onChange={(val) => setFormData({...formData, name: val})} />
                            <EditableItem icon={<LuPhone />} label="Telefone" value={formData.phoneNumber} isEditing={isEditing} onChange={(val) => setFormData({...formData, phoneNumber: val})} />
                            <div className="flex items-start gap-4 opacity-60">
                                <div className="p-3 bg-gray-50 rounded-xl text-black"><LuCalendar /></div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Membro desde</p>
                                    <p className="text-gray-900 font-semibold">{new Date(user.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-black rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-4">Seu Fintrack</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                Sua conta está segura e seus dados criptografados. Continue sua jornada para a liberdade financeira.
                            </p>
                            <div className="h-1 bg-white/20 w-full rounded-full overflow-hidden">
                                <div className="h-full bg-white w-3/3"></div>
                            </div>
                            <p className="text-[10px] uppercase font-bold mt-2 tracking-widest opacity-60">Segurança Ativa</p>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"></div>
                    </div>
                </div>

                <div className="mt-10 p-8 rounded-[2.5rem] border border-red-100 bg-red-50/30 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h4 className="text-red-600 font-bold flex items-center gap-2">
                            <LuTriangleAlert size={20} /> Zona Crítica
                        </h4>
                        <p className="text-gray-500 text-sm mt-1">A exclusão da conta é permanente e apagará todo o seu histórico financeiro.</p>
                    </div>
                    <button onClick={() => setShowDeleteModal(true)} className="bg-white text-red-600 border border-red-200 px-6 py-3 rounded-2xl font-bold text-sm cursor-pointer hover:bg-red-600 hover:text-white transition-all">
                        Excluir conta
                    </button>
                </div>

                {showDeleteModal && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl animate-in zoom-in duration-300">
                            <div className="flex justify-between items-center mb-6">
                                <div className="p-3 bg-red-100 text-red-600 rounded-2xl"><LuTrash2 size={24} /></div>
                                <button onClick={() => {setShowDeleteModal(false); setConfirmEmail('')}} className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors"><LuX size={20}/></button>
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 leading-tight">Confirmar exclusão?</h3>
                            <p className="text-gray-500 mt-4 text-sm">
                                Para confirmar a exclusão permanente de todos os seus dados, digite seu e-mail: <span className="font-bold text-black">{user.email}</span>
                            </p>
                            <input 
                                type="email" placeholder="Seu e-mail" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)}
                                className="w-full mt-6 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium"
                            />
                            <button 
                                onClick={handleDeleteAccount} disabled={confirmEmail !== user.email}
                                className={`w-full mt-6 py-4 rounded-2xl font-bold transition-all ${confirmEmail === user.email ? 'bg-red-600 text-white shadow-lg hover:bg-red-700 cursor-pointer' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                            >
                                Sim, excluir conta
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Dashboard>
    );
};

const EditableItem = ({ icon, label, value, isEditing, onChange }) => (
    <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl transition-colors ${isEditing ? 'bg-black text-white' : 'bg-gray-50 text-black'}`}>
            {icon}
        </div>
        <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{label}</p>
            {isEditing ? (
                <input 
                    type="text" value={value} onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-gray-50 border-b-2 border-black py-1 font-semibold outline-none focus:bg-gray-100 transition-all"
                />
            ) : (
                <p className="text-gray-900 font-semibold">{value || "Não informado"}</p>
            )}
        </div>
    </div>
);

export default Profile;