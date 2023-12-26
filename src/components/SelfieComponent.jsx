import React from 'react';

function SelfieComponent({selfieUrl, selfieTime}) {
    return (
        <div className="w-64 h-64 flex flex-col items-center justify-center rounded border-solid border-2 m-1">
            <img src={selfieUrl} alt="selfie" className="w-full h-auto"/>
            <p className="text-center pt-2.5 font-bold text-gray-800 text-sm">{new Date(selfieTime).toLocaleString().toUpperCase()}</p>
        </div>
    );
}

export default SelfieComponent;