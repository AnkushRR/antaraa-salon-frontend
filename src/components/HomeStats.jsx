import React, {useEffect, useState} from "react";
import {getRequest} from "../utils/apiHandler.js";
import StatsCard from "./StatsCard.jsx";



export default function ({token, logoutFn, showNotification}) {

    const [addedProducts, setaddedProducts] = useState([]);
    const [addedServices, setAddedServices] = useState([]);

    async function getProducts() {
        console.log(token);
        const response = await getRequest('get-products', {}, {
            token: `${token}`
        });

        if (response.status === 200){
            setaddedProducts(response.data.products);
        }else if (response.status === 401){
            logoutFn();
        }else{
            showNotification("error", "fetch products: "+response.message);
        }
    }

    async function getServices() {
        console.log(token);
        const response = await getRequest('get-services', {}, {
            token: `${token}`
        });

        if (response.status === 200){
            setAddedServices(response.data.services);
        }else if (response.status === 401){
            logoutFn();
        }else{
            showNotification("error", "fetch services: "+response.message);
        }
    }

    useEffect(() => {
        getProducts();
        getServices();
    }, []);


    return (
        <div className='flex flex-wrap w-screen justify-center'>
            <StatsCard title={"Added Products"} arr={addedProducts} link={'/products'} bg={'bg-violet-400'} bgDark={'bg-violet-500'}/>
            <StatsCard title={"Added Services"} arr={addedServices} link={'/services'} bg={'bg-red-400'} bgDark={'bg-red-500'}/>
        </div>
    )

}