import React from "react";
import Header from "../components/Header.jsx";
import AddServiceForm from "../components/AddServiceForm.jsx";

export default function ({logoutFn, token, notifications, showNotification}) {

    const navLinks = [
        { name: "Home", link: "/"},
        { name: "Products", link: "/products"},
        { name: "Employees", link: "/employees"},
        { name: "My Profile", link: "/profile"},
        { name: "Sales", link: "/sales"},
        { name: "Attendances", link: '/attendances'}
    ]

    return (
        <div>
            <Header currentPageTitle="Services" logoutFn={logoutFn} otherLinks={navLinks} notifications={notifications} />

            <AddServiceForm logoutFn={logoutFn} token={token} showNotification={showNotification}/>
        </div>
    )
}