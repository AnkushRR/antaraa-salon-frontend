import imageCompression from 'browser-image-compression';
import {formDataRequest, postRequest} from "../utils/apiHandler.js";


export async function uploadToServer(file, token, type) {
    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await formDataRequest('/upload-selfie', formData, {
            'token': token,
            'type': type
        });

        console.log("upload to server", response);
        return response;
    } catch (error) {
        console.error('Error while uploading file');
        throw error;
    }
}
export async function handleImageUpload(imageFile, token, type) {
    console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    console.log(`originalFile.size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    };

    try {
        const compressedFile = await imageCompression(imageFile, options);
        console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        console.log(`compressedFile.size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
        const resp = await uploadToServer(compressedFile, token, type); // write your own logic
        console.log("image upload response", JSON.stringify(resp));
        return resp;
    } catch (error) {
        console.log(error);
    }
}


