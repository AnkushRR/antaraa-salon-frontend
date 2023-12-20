import React from "react";
import { useId } from "react";

export default function ({type, message}){

    if(!message){
        console.error(`Invalid notification sent`, type, message);
    }

    if (type === "success") {
        return (
            <div key={useId()} className='p-2 text-sm bg-green-500 text-white'>
                {message}
            </div>
        )
    }else if (type === "error") {
        return (
            <div key={useId()} className='p-2 text-sm bg-red-500 text-white'>
                {message}
            </div>
        )
    }else if (type === "warning") {
        return (
            <div key={useId()} className='p-2 text-sm bg-yellow-500 text-white'>
                {message}
            </div>
        )
    }else {
        return (
            <div className='p-2 text-sm bg-gray-700 text-white'>
                {message}
            </div>
        )
    }

}