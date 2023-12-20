import React, {useEffect, useId, useRef, useState} from "react";
import {deleteHandler, editHandler} from "../services/crudServices.js";

export default function ({
        data,
        widthMax=false,
        type="text",
        action="edit",
        editable=false,
        collection,
        id,
        key1,
        token,
        showNotification,
        refreshFn
    }) {

    const [editMode, setEditMode] = useState(false);
    const [editorData, setEditorData] = useState(data);

    const saveData = async function (){
        console.log("save data called on ", data);
        console.log(token, collection, id, key1)
        if (token && collection && id && key1){
            const resp = await editHandler(token, collection, id, key1, editorData);
            showNotification("success", resp.message)
            if (refreshFn){
                refreshFn()
            }
        }
        setEditMode(false);
    }

    const deleteEntry = async function () {
        console.log("delete data called on ", data);
        console.log(token, collection, id);

        if (token && collection && id){
            const resp = await deleteHandler(token, collection, id);
            showNotification("success", resp.message)
            if (refreshFn){
                refreshFn()
            }
        }
    }

    useEffect(() => {
    }, [editorData]);

    let classNames = "border-r border-b p-2 text-sm max-w-xs h-fit";
    if (widthMax)
        classNames = "border-r border-b p-2 text-sm w-72 h-fit";
    if (editable || action === "delete")
        classNames += " hover:bg-yellow-200 cursor-pointer"

    if (editable && editMode)
        return (
            <td className="border-r w-min border-b p-2 text-sm bg-yellow-200 text-center">
                <div className={'flex flex-row'}>
                    <input
                        type={type}
                        name={key1}
                        className={'p-1 focus:outline-0 text-center'}
                        onChange={(e) => {setEditorData(e.target.value)}}
                        value={editorData}
                    />
                    <button
                        className={'p-1 text-sm font-semibold bg-green-400 text-white'}
                        type={'button'}
                        onClick={saveData}>
                        save
                    </button>
                </div>
            </td>

        )
    else if (action === "delete")
        return (
            <td onClick={deleteEntry}
                className={classNames}>
                {data}
            </td>
        )
    else
        return (
            <td onDoubleClick={() => {setEditMode(true)}}
                className={classNames}>
                {data}
            </td>
        )


}