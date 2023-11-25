import React from "react";

export default function FormInput({type, label, placeHolder, onChangeCallback}){
    return (
        <div className="my-2">
            <label className='block text-gray-900 text-sm font-bold mb-1'>
                {label}:
            </label>
            <input placeholder={placeHolder} className='shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline' onChange={e => onChangeCallback(e.target.value)} type={type} id={label} name={label}/>
        </div>
    )
}