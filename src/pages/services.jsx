import React from "react";
import Header from "../components/Header.jsx";
import AddServiceForm from "../components/AddServiceForm.jsx";

export default function ({logoutFn, token}) {

    const navLinks = [
        {name: "Home", link: "/"},
        {name: "Products", link: "/products"},
        { name: "My Profile", link: "/profile"}
    ]

    return (
        <div>
            <Header currentPageTitle="Services" logoutFn={logoutFn} otherLinks={navLinks} />

            <AddServiceForm logoutFn={logoutFn} token={token}/>
        </div>
    )
}