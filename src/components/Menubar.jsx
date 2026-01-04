import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { LuLogOut, LuMenu, LuUser, LuX } from 'react-icons/lu';
import { assets } from '../assets/assets';
import Sidebar from './Sidebar';

const Menubar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const {user, clearUser} = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        setShowDropdown(false);

        navigate("/login");
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        }

        if (showDropdown) {
                document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [showDropdown]);

  return (
    <div className="flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30">
        <div className="flex items-center gap-5">
            <button 
                onClick={() => setOpenSideMenu(!openSideMenu)}
                className="block lg:hidden text-black hover:bg-gray-100 p-1 rounded transition-colors">
                {openSideMenu ? (
                    <LuX className="text-2xl" />
                ): (
                    <LuMenu className="text-2xl" />
                )}
            </button>

            <div className="flex items-center gap-2">
                <Link to="/dashboard">
                    <img src={assets.fintrack_alt_logo} alt="Fintrack Logo" className="h-10 w-60% bg-black" />
                </Link>
            </div>
        </div>
          <div className="relative" ref={dropdownRef}>
              <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center justify-center w-10 h-10 bg-[#1f1c1f] hover:bg-black rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 cursor-pointer overflow-hidden border border-gray-200">
                  {user?.profileImageUrl ? (
                      <img src={user.profileImageUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                      <LuUser className="text-white" />
                  )}
              </button>

              {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                      <div
                          onClick={() => { navigate("/profile"); setShowDropdown(false); }}
                          className="px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors group"
                      >
                          <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-9 h-9 bg-black rounded-lg overflow-hidden shrink-0 transition-transform group-hover:scale-105">
                                  {user?.profileImageUrl ? (
                                      <img src={user.profileImageUrl} className="w-full h-full object-cover" />
                                  ) : (
                                      <LuUser className="w-5 h-5 text-white" />
                                  )}
                              </div>
                              <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold text-gray-900 truncate">{user?.name}</p>
                                  
                                  <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mt-1 group-hover:text-black transition-colors">Ver Perfil</p>
                              </div>
                          </div>
                      </div>

                      <div className="py-1">
                          <button
                              onClick={handleLogout}
                              className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          >
                              <LuLogOut className="w-4 h-4" />
                              <span>Sair da conta</span>
                          </button>
                      </div>
                  </div>
              )}
          </div>

        {openSideMenu && (
            <div className="fixed left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-20 top-[73px]">
                <Sidebar activeMenu={activeMenu} />
            </div>
        )}
    </div>
  )
}

export default Menubar