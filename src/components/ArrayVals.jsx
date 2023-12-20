import React, {useId} from "react";
import TableDataCell from "./TableDataCell.jsx";
import TableColHeader from "./TableColHeader.jsx";

export default function ({arr, title=""}) {

    if (!arr || !Array.isArray(arr) || arr.length === 0){
        return (<></>)
    }

    const keys = arr;

    return (
        <table className='font-sans h-fit'>
            <tbody className='border'>
            {
                title &&
                <tr>
                    <TableColHeader title={title} />
                </tr>

            }
                {keys.length > 0 && keys.map((key, index) => {
                    return (
                        <tr key={index} className=''>
                            <TableDataCell data={key} widthMax={true} key={useId()}/>
                        </tr>
                    )
                })
                }
            </tbody>
        </table>
    )
}