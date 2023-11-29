import React, {useState} from "react";
import Header from "../components/Header.jsx";
import HomeStats from "../components/HomeStats.jsx";

export default function Home ({logoutFn, token, admin, notifications, showNotification}){

    const navLinks = [
        { name: "Services", link: "/services"},
        { name: "Products", link: "/products"},
        { name: "Employees", link: "/employees"},
        { name: "My Profile", link: "/profile"},
        { name: "Sales", link: "/sales"}
    ];

    return (
        <div className=''>
            <Header currentPageTitle="Home" logoutFn={logoutFn} otherLinks={navLinks} notifications={notifications} />
            {
                admin && admin.firstName &&
                <div className='w-screen text-sm text-red-600 font-semibold text-right mt-2 mb-5 px-5'>
                        {admin.firstName} {admin.lastName} | {admin.role}
                </div>
            }


            <HomeStats logoutFn={logoutFn} token={token} showNotification={showNotification} />


        </div>
    )
}