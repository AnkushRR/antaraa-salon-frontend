import React from "react";
import Header from "../components/Header.jsx";
import AddServiceForm from "../components/AddServiceForm.jsx";
import AddProductsForm from "../components/AddProductsForm.jsx";

export default function ({logoutFn, token}) {

    const navLinks = [
        {name: "Home", link: "/"},
        {name: "Services", link: "/services"},
        { name: "My Profile", link: "/profile"}
    ]

    return (
        <div>
            <Header currentPageTitle="Products" logoutFn={logoutFn} otherLinks={navLinks} />

            <AddProductsForm logoutFn={logoutFn} token={token}/>
        </div>
    )
}