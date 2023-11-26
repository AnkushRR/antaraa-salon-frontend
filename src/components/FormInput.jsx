import React from "react";

export default function FormInput({type, label, placeHolder, onChangeCallback, valueState, options =[]}){
    return (
        <div className="my-2">
            <label className='block text-gray-900 text-sm font-bold mb-1'>
                {label}:
            </label>
            {
                type && type === "checkbox" ?
                    <input id={label} name={label} type={type} className='inline-block py-2 px-3 text-gray-800 ' checked={valueState} onChange={e => onChangeCallback((prev) => { return !prev })}/>
                : type === "dropdown" ?
                    <select id={label} name={label} className='shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:shadow-outline' onChange={e => onChangeCallback(e.target.value)}>
                        <option value={""}>-- select --</option>
                        {
                            options && options.map(item => {
                                return <option value={item} key={item}>{item}</option>
                            })
                        }
                    </select>
                :
                    <input placeholder={placeHolder} className='shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:shadow-outline' onChange={e => onChangeCallback(e.target.value)} type={type} id={label} name={label}/>
            }
        </div>
    )
}