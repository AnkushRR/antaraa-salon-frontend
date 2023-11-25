import React, {useEffect, useState} from "react";

export default function FormDynamicInput({label, selectList, selectedList, setSelectedList}){

    const [defaultSelect, setDefaultSelect] = useState('');
    function addItemToList (item) {
        console.log(item);
        setSelectedList((prev) => {
            const s = new Set(prev);
            s.add(item);
            return [...s];
        });
        setDefaultSelect("");
    }

    function removeItemFromList (item) {
        console.log(item, "to be removed");
        setSelectedList((prev) => {
            return prev.filter(i => i !== item);
        })
    }

    useEffect(() => {
        console.log(selectedList);
    }, [selectedList]);


    return (
        <div className="my-2">
            <label className='block text-gray-700 text-sm font-bold mb-1'>
                {label}:
            </label>
            <select value={defaultSelect} onChange={e => addItemToList(e.target.value)} className='shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                <option value={""}>{
                    selectedList.length > 0 &&
                    "--add-more--"
                }
                    {
                        selectedList.length === 0 &&
                        "--select--"
                    }</option>
                {
                    selectList && selectList.map(item =>
                        <option key={item.name} value={item.name} >{item.name}</option>
                    )
                }
            </select>

            {
                selectedList.length > 0 &&
                <small className='font-semibold'>Added Products: </small>
            }
            <ul className='m-2'>
                {selectedList && selectedList.map(item =>
                    <li key={item+`-${Date.now()}`} className='border-b-2'> <div className='flex justify-between'>{item} <a type="button" className="text-red-500 cursor-pointer" onClick={() => {removeItemFromList(item)}}>remove</a></div></li>
                )}
            </ul>
        </div>
    )
}