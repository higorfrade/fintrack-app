import React, { useState } from 'react'
import { LuLoaderCircle } from 'react-icons/lu';

const DeleteAlert = ({content, onDelete}) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);

        try {
            await onDelete();
        } finally {
            setLoading(false);
        }
    }

  return (
    <div>
        <p className="text-sm">{content}</p>
        <div className="flex justify-end mt-6">
            <button 
                onClick={handleDelete}
                disabled={loading}
                className="add-btn-static"
                type="button">
                    {loading ? (
                        <>
                            <LuLoaderCircle className="w-4 h-4 animate-spin" />
                            Excluindo...
                        </>
                    ) : (
                        <>
                            Excluir
                        </>
                    )}
            </button>
        </div>
    </div>
  )
}

export default DeleteAlert