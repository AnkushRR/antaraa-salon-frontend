import React, {useEffect, useState} from "react";
import Header from "../components/Header.jsx";
import {getRequest} from "../utils/apiHandler.js";
import AddEmployeesForm from "../components/AddEmployeesForm.jsx";
import AddSalesForm from "../components/AddSalesForm.jsx";
import { useParams } from 'react-router-dom';
import ViewSaleComponent from "../components/ViewSaleComponent.jsx";

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

    const params = new URLSearchParams(window.location.search);
    const sale_id = params.get('sale_id');
    console.log(sale_id, "sale_id");

    useEffect(() => {
        getProfile();
    }, []);

    const navLinks = [
        { name: "Home", link: "/"},
        { name: "Services", link: "/services"},
        { name: "Products", link: "/products"},
        { name: "My Profile", link: "/profile"},
        { name: "Employees", link: "/employees"},
        { name: "Attendances", link: '/attendances'}
    ];

    return (
        <div className=''>
            <Header currentPageTitle="Sales" logoutFn={logoutFn} otherLinks={navLinks} notifications={notifications} />

            {
                sale_id ?
                    <ViewSaleComponent sale_id={sale_id} token={token} logoutFn={logoutFn} showNotification={showNotification} />
                    :
                    <AddSalesForm showNotification={showNotification} logoutFn={logoutFn} token={token} />
            }
        </div>
    )
}