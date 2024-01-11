import React from "react";

export default function ({text, type, onClick}){
    return <button type={type} onClick={onClick} className='h-fit text-sm text-gray-800 font-semibold mr-2 rounded hover:border-green-400 hover:bg-green-400 hover:text-white border-2 px-2 py-1'>
        {text}
    </button>
}