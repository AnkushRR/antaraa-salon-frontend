import {postRequest} from "../utils/apiHandler.js";

export const editHandler = async function(token, collection, id, key, value)  {
    if (!token || !collection || !id || !key || !value){
        return {
            message: "Invalid request. Incomplete params info.",
            status: 400,
            data: {token, collection, id, key, value}
        }
    }

    const postResponse = await postRequest('/edit', {}, {token: token}, {
        collection,
        id,
        key,
        value
    });

    return postResponse;
}

export const deleteHandler = async function(token, collection, id)  {
    if (!token || !collection || !id){
        return {
            message: "Invalid request. Incomplete params info.",
            status: 400,
            data: {token, collection, id}
        }
    }

    const postResponse = await postRequest('/delete', {}, {token: token}, {
        collection,
        id
    });

    return postResponse;
}