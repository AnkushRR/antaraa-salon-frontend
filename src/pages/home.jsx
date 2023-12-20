import React, {useState} from "react";
import Header from "../components/Header.jsx";
import HomeStats from "../components/HomeStats.jsx";
import DashIcon from "../assets/dashboard.png";
import DashIconWhite from "../assets/dashboardWhite.png";
import LeftVerticalNavBar from "../components/LeftVerticalNavBar.jsx";
import Camera from "../components/Camera.jsx";

export default function Home ({logoutFn, token, admin, notifications, showNotification}){

    const navLinks = [
        { name: "Services", link: "/services"},
        { name: "Products", link: "/products"},
        { name: "Employees", link: "/employees"},
        { name: "My Profile", link: "/profile"},
        { name: "Sales", link: "/sales"},
        { name: "Attendances", link: '/attendances'}
    ];

    const [activeNavTab, setActiveNavTab] = useState("Dashboard");

    const navItems = [
        {
            text: "Dashboard",
            icon: DashIcon,
            iconWhite: DashIconWhite
        }
    ]

    return (
        <div className=''>
            <Header currentPageTitle="Home" logoutFn={logoutFn} otherLinks={navLinks} notifications={notifications} />
            {
                admin && admin.firstName &&
                <div className='w-screen text-sm text-red-600 font-semibold text-right mt-2 mb-5 px-5'>
                        {admin.firstName} {admin.lastName} | {admin.role}
                </div>
            }

            <div className='flex'>
                {/*<LeftVerticalNavBar active={activeNavTab} setActive={setActiveNavTab} navItems={navItems} />*/}
                <HomeStats logoutFn={logoutFn} token={token} showNotification={showNotification} />
            </div>


        </div>
    )
}