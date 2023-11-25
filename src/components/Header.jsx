import React, {useState} from "react";
import antaraa_logo from "../assets/antaraa_logo.jpeg";
import NavButton from "./NavButton.jsx";

export default function ({currentPageTitle, logoutFn, otherLinks}){
    const [title, setTitle] = useState("Antaraa Admin Dashboard");

    return (
        <div className='h-max-10 bg-white text-gray-900 header max-w-full p-3 flex flex-col space-y-2 sm:justify-between sm:flex-row sm:space-y-0 items-center border-b'>
            <a href={"/"} className='text-2xl font-sans text-center flex items-center ml-3'>
                <img src={antaraa_logo} className='h-10 mr-4 inline' alt='logo'/>
                <div className='inline h-fit text-2xl'>{title}</div>
            </a>
            <div className='navigation flex flex-row flex-wrap  justify-items-center space-y-2 sm:space-y-0 my-auto h-fit'>
                <div></div>
                <NavButton type="currentPage" text={currentPageTitle} path=""/>
                {otherLinks && otherLinks.length > 0 &&
                    otherLinks.map(item => (
                        <NavButton key={item.name} type="link" path={item.link} text={item.name} />
                    ))
                }
                { logoutFn &&
                    <NavButton type="logout" path='' text='Log Out' callback={logoutFn} />
                }
            </div>
        </div>
    )
}