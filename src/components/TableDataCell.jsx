import React from "react";

export default function ({data, key=undefined, widthMax=false}) {
    if (!widthMax){
        return (<td key={data} className='border-r border-b p-2 text-sm'>{data}</td>)
    } else {
        return (<td key={data} className='border-r border-b p-2 text-sm w-72'>{data}</td> )
    }
}