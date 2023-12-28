import React from "react";
import {Link} from "react-router-dom";

export default function FormTitle({text, navLinks}){
    return (
        <div className='mb-3 flex flex-col'>
            <div className='flex flex-row justify-between'>
                <div className='text-xl font-semibold text-slate-600 font-serif text-left '>
                    {text}
                </div>
                <div className='flex space-x-2'>
                    {
                        navLinks &&
                        navLinks.map( item => {
                            if (!item.title || !item.path)
                                return

                            let target = '_self';
                            if (item.target) {
                                target = item.target;
                            }

                            return (
                                <Link className='px-2 py-1 text-sm
                                bg-sky-950 mb-1 text-white font-semibold rounded' to={item.path} target={target} reloadDocument>{item.title}</Link>
                            )
                        })
                    }
                </div>

            </div>
            <hr />
        </div>
    )
}