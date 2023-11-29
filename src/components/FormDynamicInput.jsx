import React, {useEffect, useState} from "react";
import removeIcon from '../assets/remove.png';

export default function FormDynamicInput({label, selectList, selectedList, setSelectedList}){

    const [defaultSelect, setDefaultSelect] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categoryList, setCategoryList] = useState(selectList);

    const categories = [...new Set(selectList.map(item => item.code))];

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

    function updateSelectList(){
        if (selectedCategory === ''){
            setCategoryList(selectList.filter(item => !selectedList.includes(item.name)));
        }else{
            setCategoryList(selectList.filter(item => item.code === selectedCategory).filter(item => !selectedList.includes(item.name)));
        }
    }

    useEffect(() => {
        console.log("selected category", selectedCategory, "category list", categoryList);
        updateSelectList();
    }, [selectList]);

    useEffect(() => {
        console.log(selectedList);
        updateSelectList();
    }, [selectedList]);

    useEffect(() => {
        console.log("selected category", selectedCategory);
        updateSelectList();
    }, [selectedCategory]);


    return (
        <div className="my-2">
            <label className='block text-gray-700 text-sm font-bold mb-1'>
                {label} Category:
            </label>
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className='shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:shadow-outline mb-1' >
                <option value={''}>All Categories</option>
                {
                    categories && categories.map(item => {
                        return (<option key={item} value={item}>{item}</option> )
                    })
                }
            </select>

            <label className='block text-gray-700 text-sm font-bold mb-1'>
                Add {label}:
            </label>

            <select disabled={categoryList.length === 0} value={defaultSelect} onChange={e => addItemToList(e.target.value)} className='shadow-sm appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                <option value={""}>{
                    categoryList && categoryList.length === 0 ?
                        "All Selected"
                    :
                        `Select ${label}`
                }</option>
                {
                    categoryList.map(item =>
                        <option key={item._id} value={item.name} >{item.name}</option>
                    )
                }
            </select>

            <div className='flex flex-row-reverse flex-nowrap mt-1'>
                {
                    categoryList.length > 0 &&
                    <div className='px-2 py-1 m-1 h-fit text-center bg-green-500 rounded text-white text-xs cursor-pointer' onClick={() => {
                        for (const item of categoryList){
                            addItemToList(item.name);
                        }
                    }}>Select All</div>
                }
                {
                    selectedList.length > 0 &&
                    <div className='px-2 py-1 m-1 h-fit text-center bg-red-500 rounded text-white text-xs cursor-pointer' onClick={() => {
                        for (const item of selectedList){
                            removeItemFromList(item);
                        }
                    }}>Remove All</div>
                }
            </div>

            <ul className='mx-1 space-y-1'>
                {selectedList && selectedList.map(item =>
                    <li key={item+`-${Date.now()}`} className='rounded bg-green-200 px-2 py-1 text-gray-950'> <div className='flex justify-between'> <div>{item} </div> <img src={removeIcon} alt="remove" className="h-6 cursor-pointer py-1 " onClick={() => {removeItemFromList(item)}} /> </div></li>
                )}
            </ul>
        </div>
    )
}