import React from "react";

export default function ({arr, title, bg, bgDark, link}) {

    const parentClasses = 'flex flex-col max-w-md w-52 font-light shadow-lg m-2 pt-5 text-right '+bg;

    const footerClasses = 'flex text-white px-2 text-xs justify-between py-1 '+bgDark;

    return (
        <div className={parentClasses}>
            <div className='px-3 text-3xl text-white font-bold'>
                {arr.length}
            </div>
            <div className='px-3 text-sm text-white pb-3'>
                {title}
            </div>
            <a href={link} className={footerClasses}>
                <div className=''>VIEW MORE</div>
                <div className=''> {'>>'} </div>
            </a>
        </div>
    )
}