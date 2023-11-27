import React from "react";

export default function ({children}) {
    return (
        <div className='bg-white shadow-lg mx-1 rounded px-8 pt-6 pb-5 mb-4 mt-5 w-full sm:w-4/6 overflow-hidden'>
            {children}
        </div>
    )
}