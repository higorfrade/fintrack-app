import React from 'react'
import PhoneInput from 'react-phone-input-2'

const CustomPhoneInput = ({label, value, onChange}) => {

  return (
    <div className="mb-4">
        <label className="text-[13px] text-slate-800 block mb-1">{label}</label>
        <PhoneInput
            country={'br'}
            masks={{br: '(..) .....-....'}}
            value={value}
            onChange={onChange}
            inputClass="!w-full !h-[42px] !text-gray-700 !rounded-md !border !border-gray-300 !bg-transparent focus:!border-blue-500"
            buttonClass="!border !border-gray-300 !bg-gray-100 hover:!bg-gray-200"
            dropdownClass="!text-gray-700"
        />
    </div>
  )
}

export default CustomPhoneInput