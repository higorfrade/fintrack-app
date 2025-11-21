import EmojiPicker from 'emoji-picker-react';
import React, { useState } from 'react'
import { LuImage, LuX } from 'react-icons/lu';

const EmojiPickerPopup = ({icon, onSelect}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleEmojiPick = (emoji) => {
        onSelect(emoji?.imageUrl || "");
        setIsOpen(false);
    }

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
        <div 
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-4 cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-gray-100 text-black rounded-lg">
                    {icon ? (
                        <img src={icon} alt="Icone" className="w-12 h-12" />
                    ) : (
                        <LuImage />
                    )}
                </div>
                <p>{icon ? "Alterar ícone" : "Selecionar ícone"}</p>
        </div>
          {isOpen && (
              <div className="relative">
                  <button
                      onClick={() => setIsOpen(false)}
                      className="w-7 h-7 flex items-center justify-center bg-white border border-black rounded-full absolute -top-2 -right-2 z-10 cursor-pointer">
                      <LuX />
                  </button>
                  <EmojiPicker
                      open={isOpen}
                      onEmojiClick={handleEmojiPick}
                  />
              </div>
          )}
    </div>
  )
}

export default EmojiPickerPopup