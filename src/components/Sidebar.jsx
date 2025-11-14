import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { LuUser } from 'react-icons/lu';
import { SIDE_BAR_DATA } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({activeMenu}) => {
    const {user} = useContext(AppContext);
    const navigate = useNavigate();

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-gray-200/50 p-5 sticky top-[61px] z-20">
        <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
            {user?.profileImageUrl ? (
                <img src={user?.profileImageUrl || ""} alt="Profile Image" className="w-20 h-20 bg-slate-400 rounded-full" />
            ): (
                <LuUser className="w-20 h-20 text-xl  bg-gray-100 rounded-full" />
            )}
            <h5 className="text-gray-950 font-medium leading-6">{user.name || ""}</h5>
        </div>
        {SIDE_BAR_DATA.map((item, index) => (
            <button
                onClick={()  => navigate(item.path)}
                key={`menu_${index}`}
                className={`w-full flex itemx-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 hover:bg-black hover:text-white transition-colors duration-50 cursor-pointer ${activeMenu == item.label ? "text-white bg-black" : ""}`}>
                    <item.icon className="text-xl" />
                    {item.label}
            </button>
        ))}
    </div>
  )
}

export default Sidebar