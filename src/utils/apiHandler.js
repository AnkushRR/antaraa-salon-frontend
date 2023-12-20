import { API_EP } from "../constants";

export async function getRequest(path, params, headers){
    try {
        let response = await fetch(`${API_EP}/${path}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...headers
            },
            params: params
        });
        console.log("pre response", path, response);
        
        response = await response.json();

        console.log("response", path, response);

        return response;
    } catch (e) {
        console.log(e);
        return {
            status: 500,
            message: `ERROR: ${e.message}`,
            data: {}
        };
    }
}

export async function postRequest(path, params, headers, body){
    try {
        let response = await fetch(`${API_EP}/${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...headers
            },
            params: params,
            body: JSON.stringify(body)
        });
        console.log("pre response", path, response);
        
        response = await response.json();

        console.log("response", path, response);

        return response;
    } catch (e) {
        console.log(e);
        return {
            status: 500,
            message: `ERROR: ${e.message}`,
            data: {}
        };
    }
}

export async function formDataRequest(path, formData, headers) {
    try {
        let response = await fetch(`${API_EP}/${path}`, {
            method: 'POST',
            headers: {
                ...headers
            },
            body: formData
        });

        console.log("pre response", path, response);

        response = await response.json();

        console.log("response", path, response);

        return response;
    } catch (e) {
        console.log(e);
        return {
            status: 500,
            message: `ERROR: ${e.message}`,
            data: {}
        };
    }
}