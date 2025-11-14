import React, { useRef, useState } from 'react'
import { LuTrash, LuUpload, LuUser } from 'react-icons/lu';

const ProfileImageSelector = ({image, setImage}) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImage(file);

            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    }

    const handleRemoveImage = (e) => {
        e.preventDefault();
        setImage(null);
        setPreviewUrl(null);
    }

    const onChooseFile = (e) => {
        e.preventDefault();
        inputRef.current?.click();
    }

  return (
    <div className="flex justify-center mb-6">
        <input type="file" 
            accept="image/*"
            ref={inputRef}
            onChange={handleImageChange}
            className="hidden"
        
        />

        {!image ? (
            <div className="w-20 h-20 flex items-center justify-center bg-black rounded-full relative">
                <LuUser className="text-white" size={35} />
                <button 
                    onClick={onChooseFile}
                    className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer">
                        <LuUpload size={15} />
                </button>
            </div>
        ): (
            <div className="relative">
                <img src={previewUrl} alt="Imagem de perfil" className="w-20 h-20 rounded-full object-cover" />
                <button 
                    onClick={handleRemoveImage}
                    className="w-8 h-8 flex items-center justify-center bg-red-800 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer">
                        <LuTrash size={15} />
                </button>
            </div>
        )}
    </div>
  )
}

export default ProfileImageSelector;