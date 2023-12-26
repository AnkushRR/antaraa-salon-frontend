import React, { useState, useRef, useEffect } from "react";
import { handleImageUpload } from "../services/imageCompression.js";
import {getRequest} from "../utils/apiHandler.js";

const Camera = ({ token, showNotification, logoutFn }) => {

    const videoRef = useRef();
    const canvasRef = useRef();
    const [isSelfieUploaded, setIsSelfieUploaded] = useState(false);
    const [stream, setStream] = useState(null);

    const getTodayAttendance = async () => {
        const response = await getRequest('get-today-attendance', {}, {
            token: token
        });

        if (response.status === 200){
            showNotification("success", "Attendance fetched successfully");
            setIsSelfieUploaded(true);

            const canvas = canvasRef.current;
            canvas.width = 600;
            canvas.height = 500;

            // Drawing image from URL
            const img = new Image();
            img.onload = () => {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
                const text = response.data.attendance.selfieDateStr;
                const textSize = 30; // You can adjust this as needed
                ctx.font = textSize+"px Arial";
                const textWidth = ctx.measureText(text).width;
                const x = 5; // position text 5px from the right edge
                const y = 30; // position text 5px down from the top edge
                ctx.fillStyle = 'white';
                ctx.fillText(text, x, y);
            };
            img.src = response.data.attendance.selfieUrl;

        }else {
            setIsSelfieUploaded(false);

            if (navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then((mediaStream) => {
                        videoRef.current.srcObject = mediaStream;
                        setStream(mediaStream);
                    })
                    .catch((err) => console.log("Something went wrong!", err));
            }
        }
    }

    useEffect(() => {
        getTodayAttendance();
    }, [token]);



    const takePicture = async () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/png');

        // Convert dataURL to Blob
        const byteString = window.atob(dataUrl.split(',')[1]);
        const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const imageBlob = new Blob([ab], { type: mimeString });
        const resp = await handleImageUpload(imageBlob, token);
        if (resp.status === 200){
            showNotification("success", "Upload Selfie: "+resp.message);
            setIsSelfieUploaded(true);
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                videoRef.current.srcObject = null;
                videoRef.current.load();
            }
        }
        else if (resp.status === 401){
            logoutFn();
        }else {
            showNotification("error", "Upload Selfie: "+resp.message);
        }
    }

    return (
        <div className='max-w-sm flex flex-col space-y-2'>
            {
                !isSelfieUploaded &&
                <>
                    <video ref={videoRef} autoPlay playsInline muted></video>

                    <button className='bg-green-500 text-white font-semibold text-sm py-2 rounded'
                            onClick={takePicture}>Take picture
                    </button>
                </>
            }


            <canvas className='w-full' ref={canvasRef}></canvas>
        </div>
    );
}

export default Camera;