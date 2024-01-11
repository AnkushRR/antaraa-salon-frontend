import React from "react";
import removeImg from "../assets/remove.png";

export default function FormInput({type, label, placeHolder, onChangeCallback, valueState, options =[], disabled=false, ref=null, removeCallback=()=>{}}){
    return (
        <div className="my-2">
            <label className='block text-gray-900 text-sm font-bold mb-1'>
                {label}:
            </label>
            {
                type && type === "checkbox" ?
                    <input disabled={disabled} id={label} name={label} type={type}
                           className='inline-block py-2 px-3 text-gray-800 '
                           checked={valueState}
                           onChange={e => onChangeCallback((prev) => {
                               return !prev
                           })} ref={ref}/>
                : type === "dropdown" ?
                    <select id={label} name={label}
                            className='shadow-sm bg-white appearance-none border rounded
                            w-full py-2 px-3 text-gray-800 leading-tight focus:shadow-outline'
                            onChange={e => onChangeCallback(e.target.value)}
                            ref={ref}>
                        <option value={""}>-- select --</option>
                        {
                            options && options.map(item => {
                                return <option value={item} key={item}>{item}</option>
                            })
                        }
                    </select>
                : type === "dropdown-multiselect" ?
                    <div >
                        <select id={label} name={label}
                                className='shadow-sm bg-white appearance-none border rounded
                        w-full py-2 px-3 text-gray-800 leading-tight focus:shadow-outline'
                                onChange={e => onChangeCallback(e.target.value)}
                                ref={ref}>
                            <option value={""}>-- select --</option>
                            {
                                options && options.map(item => {
                                    return <option value={item} key={item}>{item}</option>
                                })
                            }
                        </select>
                        <div className="flex flex-col mt-1 space-y-0.5">
                        {
                            valueState && valueState.length > 0 &&
                            valueState.map(id => {
                                return <div key={id} className='p-1 bg-amber-300 text-black'>{id}
                                    <img onClick={() => {
                                        removeCallback(id)
                                    }} className="h-4 w-4 ml-3 inline-block" src={removeImg} alt={"remove"}/> </div>
                            })
                        }
                        </div>
                    </div>
                :
                    <input disabled={disabled} placeholder={placeHolder}
                       className='shadow-sm bg-white appearance-none border
                       rounded w-full py-2 px-3 text-gray-800 leading-tight
                       focus:shadow-outline' onChange={e => onChangeCallback(e.target.value)}
                       type={type} id={label} name={label} value={valueState} ref={ref}/>
            }
        </div>
    )
}