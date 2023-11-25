import React from "react";

export default function NavButton({type, text, path, callback}){

    if (type === "currentPage"){
        return (
            <a type='button' style={{lineHeight: "inherit"}} className='h-fit text-sm text-gray-500 font-semibold mr-2 px-2 py-1 border-b border-b-gray-500 bg-white'>{text}</a>
        );
    }else if(type === "logout"){
        return (
            <a type='button' onClick={callback} className='h-fit text-sm text-gray-800 font-semibold mr-2 rounded hover:border-red-500 hover:bg-red-500 hover:text-white border-2 px-2 py-1'>{text}</a>
        );
    }else {
        return (
            <a href={path} className='h-fit text-sm text-gray-800 font-semibold mr-2 rounded hover:border-green-400 hover:bg-green-400 hover:text-white border-2 px-2 py-1' >{text}</a>
        )
    }
}