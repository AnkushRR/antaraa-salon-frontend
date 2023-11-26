import React, {useEffect, useState} from "react";
import Header from "../components/Header.jsx";
import {getRequest} from "../utils/apiHandler.js";
import AddEmployeesForm from "../components/AddEmployeesForm.jsx";

export default function ({token, logoutFn, notifications, showNotification}) {

    const [admin, setAdmin] = useState({});

    async function getProfile(){
        const response = await getRequest('profile', {}, {
            token: `${token}`
        });

        if (response.status === 200){
            setAdmin(response.data.admin);
        }else if (response.status === 401){
            logoutFn();
        }else {
            showNotification("error", "Failed to get profile, "+response.message);
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    const navLinks = [
        { name: "Home", link: "/"},
        { name: "Services", link: "/services"},
        { name: "Products", link: "/products"},
        { name: "My Profile", link: "/profile"},
    ];

    return (
        <div className=''>
            <Header currentPageTitle="Employees" logoutFn={logoutFn} otherLinks={navLinks} notifications={notifications} />

            <AddEmployeesForm token={token} logoutFn={logoutFn} showNotification={showNotification} />
        </div>
    )
}