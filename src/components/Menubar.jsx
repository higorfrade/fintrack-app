import React, { useContext, useRef, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
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

  return (
    <div className="flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30">
        {/* Left side - Logo */}
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
                <img src={assets.fintrack_alt_logo} alt="Fintrack Logo" className="h-10 w-60% bg-black" />
            </div>
        </div>
        {/* Right side - Profile avatar */}
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center justify-center w-10 h-10 bg-[#1f1c1f] hover:bg-black rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 cursor-pointer">
                <LuUser className="text-white" />
            </button>

            {/* Dropdown menu */}
            {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-gray-400">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 bg-black rounded-full">
                                <LuUser className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 truncate">
                                    {user.name}
                                </p>
                                <p className="text-xs text-gray-400 truncate">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Dropdown options */}
                    <div className="py-1">
                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-1 w-full px-4 py-2 text-sm text-black hover:bg-gray-50 hover:font-medium transition-colors duration-150 cursor-pointer">
                            <LuLogOut className="w-4 h-4" /> 
                            <span>Sair</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
        {/* Mobile menu */}
        {openSideMenu && (
            <div className="fixed left-0 right-0 bg-white border-b border-gray-200 lg:hidden z-20 top-[73px]">
                <Sidebar activeMenu={activeMenu} />
            </div>
        )}
    </div>
  )
}

export default Menubar