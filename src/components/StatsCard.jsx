import React from "react";

export default function ({arr, title, bg, bgDark, link}) {

    const parentClasses = 'flex flex-col sm:w-3/12 max-w-md w-64 font-light sm:space-y-1 sm:mt-10 sm:text-center shadow-lg m-2 pt-5 text-right '+bg;

    const footerClasses = 'flex text-white px-2 text-xs sm:text-sm justify-between py-1 '+bgDark;

    return (
        <div className={parentClasses}>
            <div className='px-3 text-3xl sm:text-5xl text-white font-bold'>
                {arr.length}
            </div>
            <div className='px-3 text-sm sm:text-xl text-white pb-3'>
                {title}
            </div>
            <a href={link} className={footerClasses}>
                <div className=''>VIEW MORE</div>
                <div className=''> {'>>'} </div>
            </a>
        </div>
    )
}