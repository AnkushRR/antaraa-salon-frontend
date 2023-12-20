import React, {useEffect, useState} from "react";
import Header from "../components/Header.jsx";
import KeyVal from "../components/KeyVal.jsx";
import CenterMainCard from "../components/CenterMainCard.jsx";
import {getRequest} from "../utils/apiHandler.js";
import Camera from "../components/Camera.jsx";

export default function ({token, logoutFn, notifications, showNotification}) {

    const [admin, setAdmin] = useState({});
    const [employees, setEmployees] = useState({});

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
                    </div>
                } />
            }

            {!admin &&
                <div className='text-xl'>
                    Fetching profile..
                </div>
            }


        </div>
    )
}