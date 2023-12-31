import React from "react";
import FormTitle from "./FormTitle.jsx";

export default function ({title, children, titleNavLinks=[]}) {

    return (
        <div className='bg-white rounded p-5 mt-5 mx-auto w-fit text-center'>
            <FormTitle text={title} navLinks={titleNavLinks} />
            {children}
        </div>
    )
}