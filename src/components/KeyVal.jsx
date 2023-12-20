import React from "react";
import TableDataCell from "./TableDataCell.jsx";
import TableColHeader from "./TableColHeader.jsx";

export default function ({obj, ignoreArrays=false}) {

    if (!obj){
        return (<></>)
    }

    const keys = Object.keys(obj);

    return (
        <table className='font-sans h-fit'>
            <tbody className='border'>
                {keys.length > 0 && keys.map((key, index) => {
                    if (ignoreArrays && Array.isArray(obj[key]))
                        return

                    if (typeof obj[key] === "string" && key.includes('At')){
                        const date = new Date(obj[key]);
                        if (date){
                            return (
                                <tr key={index} className=''>
                                    <TableColHeader title={key} />
                                    <TableDataCell data={date.toLocaleString()} widthMax={true} key={key}/>
                                </tr>
                            )
                        }
                    }

                    if (typeof obj[key] === "boolean"){
                        return (
                            <tr key={index} className=''>
                                <TableColHeader title={key} />
                                <TableDataCell data={obj[key] ? "Yes": "No"} widthMax={true} key={key}/>
                            </tr>
                        )
                    }

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