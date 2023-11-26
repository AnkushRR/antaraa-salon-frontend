import React from "react";

export default function ({child}) {
    return (
        <div className='bg-white shadow-lg rounded px-8 pt-6 pb-1 mb-4 mt-5 sm:max-w-md max-w-sm'>
            {child}
        </div>
    )
}