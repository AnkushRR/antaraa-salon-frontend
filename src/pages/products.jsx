import React from "react";
import Header from "../components/Header.jsx";
import AddServiceForm from "../components/AddServiceForm.jsx";
import AddProductsForm from "../components/AddProductsForm.jsx";

export default function ({logoutFn, token, notifications, showNotification}) {

    const navLinks = [
        {name: "Home", link: "/"},
        {name: "Services", link: "/services"},
        { name: "Employees", link: "/employees"},
        { name: "My Profile", link: "/profile"},
        { name: "Sales", link: "/sales"}
    ]

    return (
        <div>
            <Header currentPageTitle="Products" logoutFn={logoutFn} otherLinks={navLinks} notifications={notifications} />

            <AddProductsForm logoutFn={logoutFn} token={token} showNotification={showNotification}/>
        </div>
    )
}