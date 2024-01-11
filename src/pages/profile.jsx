import React, {useEffect, useState} from "react";
import Header from "../components/Header.jsx";
import KeyVal from "../components/KeyVal.jsx";
import CenterMainCard from "../components/CenterMainCard.jsx";
import {getRequest} from "../utils/apiHandler.js";
import Camera from "../components/Camera.jsx";

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
            showNotification("error", "fetch profile: "+response.message);
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    const navLinks = [
        { name: "Home", link: "/"},
        { name: "Services", link: "/services"},
        { name: "Products", link: "/products"},
        { name: "Employees", link: "/employees"},
        { name: "Sales", link: "/sales"},
        { name: "Attendances", link: '/attendances'}
    ];

    console.log(admin);

    return (
        <div className=''>
            <Header currentPageTitle="My Profile" logoutFn={logoutFn} otherLinks={navLinks} notifications={notifications} />

            <CenterMainCard title={"Attendance"} children={
                <div className='mx-0 flex flex-row space-x-2 flex-wrap'>
                    <Camera type={"punch-in"} token={token} logoutFn={logoutFn} showNotification={showNotification} />
                    <Camera type={"punch-out"} token={token} logoutFn={logoutFn} showNotification={showNotification} />
                </div>
            } />

            {admin && admin.userName &&
                <CenterMainCard title={"My Profile"} children={
                    <div className='mx-0'>
                        <KeyVal obj={admin} />
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