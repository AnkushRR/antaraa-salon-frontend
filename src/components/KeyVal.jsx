import React from "react";
import TableDataCell from "./TableDataCell.jsx";
import TableColHeader from "./TableColHeader.jsx";

export default function ({obj}) {

    if (!obj){
        return (<></>)
    }

    const keys = Object.keys(obj);

    return (
        <table className='font-sans'>
            <tbody>
                {keys.length > 0 && keys.map((key, index) => {
                    return (
                        <tr key={index} className=''>
                            <TableColHeader title={key} />
                            <TableDataCell data={obj[key]} widthMax={true} key={key}/>
                        </tr>
                    )
                })
                }
            </tbody>
        </table>
    )
}