import React from "react";
import {Link} from "react-router-dom";

export default function FormTitle({text, navLinks}){
    return (
        <div className='mb-3 flex flex-col'>
            <div className='flex flex-row justify-between'>
                <div className='text-xl font-semibold text-slate-600 font-serif text-left '>
                    {text}
                </div>
                {
                    navLinks &&
                        navLinks.map( item => {
                            if (!item.title || !item.path)
                                return

                            return (
                                <Link className='px-2 py-1 text-sm
                                bg-sky-950 mb-1 text-white font-semibold rounded' to={item.path} reloadDocument>{item.title}</Link>
                            )
                        })
                }
            </div>
            <hr />
        </div>
    )
}