import React from 'react'
import { addThousandSeparator } from '../utils/utils'

const CustomTooltip = ({active, payload}) => {
    /* Se o Tooltip estiver ativo e conter dados */
    if (active && payload && payload.length) {
        return (
            <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                {/* Exibe o nome da transação e o valor */}
                <p className="text-xs font-semibold text-black mb-1">{payload[0].name}</p> 
                <p className="text-sm text-gray-600">
                    Valor: <span>R&#36;{addThousandSeparator(payload[0].value)}</span>
                </p>
            </div>
        );
    }

    return null;
}

export default CustomTooltip