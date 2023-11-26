import React, {useEffect, useState} from "react";
import Header from "../components/Header.jsx";
import KeyVal from "../components/KeyVal.jsx";
import CenterMainCard from "../components/CenterMainCard.jsx";
import {getRequest} from "../utils/apiHandler.js";

export default function ({token, logoutFn}) {

    const [admin, setAdmin] = useState({});

    async function getProfile(){
        const response = await getRequest('profile', {}, {
            token: `${token}`
        });

        if (response.status === 200){
            setAdmin(response.data.admin);
        }else if (response.status === 401){
            logoutFn();
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    const navLinks = [
        { name: "Home", link: "/"},
        { name: "Services", link: "/services"},
        { name: "Products", link: "/products"}
    ];

    console.log(admin);

    return (
        <div className=''>
            <Header currentPageTitle="My Profile" logoutFn={logoutFn} otherLinks={navLinks} />

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