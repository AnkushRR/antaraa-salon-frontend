import React, {useEffect, useState} from "react";
import Header from "../components/Header.jsx";
import CenterMainCard from "../components/CenterMainCard.jsx";
import {getRequest, postRequest} from "../utils/apiHandler.js";
import SelfieComponent from "../components/SelfieComponent.jsx";

export default function ({token, logoutFn, notifications, showNotification}) {

    const [admin, setAdmin] = useState({});
    const [employees, setEmployees] = useState({});

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [attendances, setAttendances] = useState(null);
    const [selectedAdmin, setSelectedAdmin] = useState(null);

    const handleFormSubmit = async e => {
        e.preventDefault();

        if (!selectedAdmin){
            showNotification("error", "Invalid Date Range");
            return;
        }

        const startDate = new Date(fromDate);
        const endDate = new Date(toDate);

        if (startDate > endDate) {
            showNotification("error", "Invalid Date Range");
            return;
        }

        // Handle form submission here
        const response = await getRequest(`get-attendance-range?startDate=${fromDate}&endDate=${toDate}&adminId=${selectedAdmin}`,
            {}, {token});

        if (response.status === 200){
            setAttendances(response.data.attendance);
        }else if (response.status === 401){
            logoutFn();
        }else {
            showNotification("error", "fetch attendances: "+response.message);
        }
    };

    async function getProfile(){
        const response = await getRequest('profile', {}, {
            token: `${token}`
        });

        if (response.status === 200){
            setAdmin(response.data.admin);
        }else if (response.status === 401){
            logoutFn();
        }else {
            showNotification("error", "fetch profile: "+response.message);
        }
    }

    async function getEmployees() {
        console.log(token);
        const response = await getRequest('get-employees', {}, {
            token: `${token}`
        });

        if (response.status === 200){
            setEmployees(response.data.employees);
        }else if (response.status === 401){
            logoutFn();
        }else {
            showNotification("error", "error in fetching employees "+response.message);
        }
    }

    useEffect(() => {
        getProfile();
        getEmployees();
    }, [token]);

    const navLinks = [
        { name: "Home", link: "/"},
        { name: "Services", link: "/services"},
        { name: "Products", link: "/products"},
        { name: "Employees", link: "/employees"},
        { name: "Sales", link: "/sales"},
        { name: "My Profile", link: "/profile"}
    ];

    console.log(admin);

    return (
        <div className=''>
            <Header currentPageTitle="Attendances" logoutFn={logoutFn} otherLinks={navLinks} notifications={notifications} />

            {admin && admin.userName &&
                <CenterMainCard title={"Attendance Dashboard"} children={
                    <div className='w-full'>
                        <div className="w-fit">
                            <form onSubmit={handleFormSubmit} className='mb-2'>
                            <div className='flex justify-between'>
                                <select className='rounded border px-3 py-2 mr-2'
                                onChange={e => setSelectedAdmin(e.target.value)}
                                >
                                    <option value="">-- select --</option>
                                    {employees.length > 0 && employees.map(employee =>
                                        <option key={employee._id} value={employee._id}>{employee.email}</option>
                                    )}
                                </select>
                                <input
                                    type="date"
                                    value={fromDate}
                                    onChange={e => setFromDate(e.target.value)}
                                    className='rounded border px-3 py-2 mr-2'
                                />
                                <input
                                    type="date"
                                    value={toDate}
                                    onChange={e => setToDate(e.target.value)}
                                    className='rounded border px-3 py-2'
                                />
                                <button type="submit" className='rounded border px-3 py-2 ml-2 hover:border-green-400 hover:bg-green-400 hover:text-white'>Submit</button>
                            </div>
                        </form>
                        </div>

                        <div className='flex flex-wrap'>
                            { attendances && attendances.length > 0 &&
                                attendances.map(attendance =>
                                    <SelfieComponent key={attendance._id} selfieUrl={attendance.selfieUrl} selfieTime={attendance.selfieTime} />
                                )
                            }
                            {
                                !attendances || attendances.length === 0 &&
                                <p className={'text-sm text-gray-800'}>No attendance records found between {fromDate} to {toDate}!</p>
                            }
                        </div>
                    </div>
                }/>
            }

            {!admin &&
                <div className='text-xl'>
                    Fetching profile..
                </div>
            }


        </div>
    )
}