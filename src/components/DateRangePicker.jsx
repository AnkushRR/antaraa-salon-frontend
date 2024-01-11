import React, { useState } from "react";
export default function ({startDate, endDate, setStartDate, setEndDate, submitCallBack}){

    const [loading, setLoading] = useState(false);

    const handleOnClick = () => {
        setLoading(true);
        submitCallBack();
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    return (
        <div className=" mx-auto my-3 py-1 px-5 bg-green-300 rounded-lg shadow-lg space-x-2">
            <label htmlFor={"startDate"}>Start Date:</label>
            <input id={"startDate"} className="border border-gray-300 p-2 my-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <label htmlFor={"endDate"}>End Date:</label>
            <input id={"endDate"} className="border border-gray-300 p-2 my-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <button disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
             onClick={handleOnClick}> {loading ? "Fetching.." : "Submit"} </button>
        </div>
    );
}