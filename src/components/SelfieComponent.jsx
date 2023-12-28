import React from 'react';

function SelfieComponent({selfieUrl, selfieTime}) {
    return (
        <div className="w-48 h-fit flex flex-col items-center justify-center rounded border-solid border-2 m-1">
            <img src={selfieUrl} alt="selfie" className='w-64 max-h-36'/>
            <p className="text-center p-1 font-bold text-gray-800 text-sm">{new Date(selfieTime).toLocaleString().toUpperCase()}</p>
        </div>
    );
}

export default SelfieComponent;