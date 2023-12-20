import React, {useEffect, useState} from 'react';
import {getRequest} from "../utils/apiHandler.js";
import CenterMainCard from "./CenterMainCard.jsx";
import KeyVal from "./KeyVal.jsx";
import ArrayVals from "./ArrayVals.jsx";
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function ({sale_id, token, showNotification, logoutFn}){

    const [addedProducts, setAddedProducts] = useState([]);
    const [addedServices, setAddedServices] = useState([]);
    const [sales, setSales] = useState([]);
    const [allAdmins, setAllAdmins] = useState([]);
    const [selectedSale, setSale] = useState(null);

    const [saleProducts, setSaleProducts] = useState([]);
    const [saleServices, setSaleServices] = useState([]);

    async function getProducts() {
        console.log(token);
        const response = await getRequest('get-products', {}, {
            token: `${token}`
        });

        if (response.status === 200){
            setAddedProducts(response.data.products);
        }else if (response.status === 401){
            logoutFn();
        }else {
            showNotification("error", "fetch Products: "+response.message);
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
        }else {
            showNotification("error", "fetch Services: "+response.message);
        }
    }

    async function getSales(){
        const response = await getRequest('get-sales', {}, {
            token: `${token}`
        });

        if (response.status === 200){
            setSales(response.data.sales);
        }else if (response.status === 401){
            logoutFn();
        }else {
            showNotification("error", "fetch Sales: "+response.message);
        }
    }

    async function getAdmins() {
        const response = await getRequest('get-admins', {}, {
            token: `${token}`
        });

        if (response.status === 200){
            setAllAdmins(response.data.admins);
        }else if (response.status === 401){
            logoutFn();
        }else {
            showNotification("error", "fetch Sales: "+response.message);
        }
    }

    useEffect(() => {
        console.log(addedServices);
        getProducts();
        getServices();
        getAdmins();
    }, []);

    useEffect(() => {
        getSales();
    }, [addedProducts, addedServices]);

    useEffect(() => {
        const sale = sales?.find(item => item._id === sale_id);
        if (sale){
            setSale(sale);
        }
    }, [sales]);

    useEffect(() => {
        if (selectedSale) {
            if (addedServices && selectedSale.services) {
                const s_services = [];
                for (const id of selectedSale.services) {
                    const serv = addedServices.find(item => item._id === id);
                    if (serv) {
                        s_services.push(serv.name);
                    }
                }

                if (s_services) {
                    setSaleServices(s_services);
                }
            }

            if (addedProducts && selectedSale.products) {
                const s_products = [];
                for (const id of selectedSale.products) {
                    const serv = addedProducts.find(item => item._id === id);
                    if (serv) {
                        s_products.push(serv.name);
                    }
                }

                if (s_products) {
                    setSaleProducts(s_products);
                }
            }
        }
    }, [selectedSale]);

    return (
        <CenterMainCard title={"View Sale"} titleNavLinks={[{title: "All Sales", path: "/sales"}]} children={
            < >
                { selectedSale ?
                    <div className='flex flex-row space-x-2 p-2'>
                        <KeyVal obj={selectedSale} ignoreArrays={true}/>
                        <ArrayVals arr={saleServices} title={"Services"} />
                        <ArrayVals arr={saleProducts} title={"Products"} />
                        {
                            selectedSale.isInvoiceGenerated && selectedSale.invoiceLink ?
                                <Document
                                    file={selectedSale.invoiceLink}
                                    onLoadError={console.error}
                                >
                                    <Page pageNumber={1} />
                                </Document>
                                :
                                <div className='bg-red-700 p-2 text-sm text-white h-fit' >Invoice not generated yet</div>
                        }
                    </div>
                    :
                    `Fetching sale info.. please wait`
                }
            </>
        } />
    )

}