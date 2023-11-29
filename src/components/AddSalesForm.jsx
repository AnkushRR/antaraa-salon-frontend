import React, {useEffect, useState} from "react";
import FormTitle from "./FormTitle.jsx";
import FormInput from "./FormInput.jsx";
import {getRequest, postRequest} from "../utils/apiHandler.js";
import TableColHeader from "./TableColHeader.jsx";
import TableDataCell from "./TableDataCell.jsx";
import MaxWTableCard from "./MaxWTableCard.jsx";
import FormCard from "./FormCard.jsx";
import FormDynamicInput from "./FormDynamicInput.jsx";
import products from "../pages/products.jsx";

export default function ({token, logoutFn, showNotification}){

    const [sales, setSales] = useState([]);
    const [addedProducts, setAddedProducts] = useState([]);
    const [addedServices, setAddedServices] = useState([]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [baseBillAmount, setBaseBillAmount] = useState(0);
    const [totalBillAmount, setTotalBillAmount] = useState(0);
    const [isFormReady, setIsFormReady] = useState(false);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [paidAmount, setPaidAmount] = useState(0);
    const [formClear, setFormClear] = useState(false);

    const [loading, setloading] = useState(false);
    const [loginErr, setloginErr] = useState("");

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

    useEffect(() => {
        console.log(addedServices);
        getProducts();
        getServices();
        getSales();
    }, []);

    useEffect(() => {
        if (addedServices && addedServices.length > 0 && addedProducts && addedProducts.length > 0){
            setIsFormReady(true);
        }
    }, [addedServices, addedProducts]);

    useEffect(() => {
        let baseBillAmount = 0;
        for (const serviceName of selectedServices){
            const service = addedServices.find(item => item.name === serviceName);
            baseBillAmount += service.sellingPrice;
        }
        for (const productName of selectedProducts){
            const product = addedProducts.find(item => item.name === productName);
            baseBillAmount += product.sellingPrice;
        }
        setBaseBillAmount(baseBillAmount);
    }, [selectedServices, selectedProducts]);

    useEffect(() => {
        let billAmt = baseBillAmount;
        if (discountAmount){
            billAmt -= discountAmount;
        }
        if (billAmt < 0){
            setTotalBillAmount(0);
        }else {
            setTotalBillAmount(billAmt);
        }
    }, [baseBillAmount, discountAmount]);

    function clearForm() {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setDob(null);
        setSelectedProducts([]);
        setSelectedServices([]);
        setDiscountAmount(0);
        setPaidAmount(0);
    }

    // useEffect(() => {
    //     if (formClear){
    //         clearForm();
    //         setFormClear(false);
    //     }
    // }, [formClear]);

    async function addSaleHandler(){
        const response = await postRequest('/add-sale', {}, {token: token}, {
            firstName,
            lastName,
            email,
            phone,
            dob,
            services: selectedServices,
            products: selectedProducts,
            baseBillAmount,
            discountAmount,
            paidAmount
        });

        console.log("Add Sale form response", response);
        if (response.status === 200){
            console.log("Add Sale success", response.message, response.data);
            showNotification("success", "Add Sale success");
        }else {
            setloginErr(response.message);
            setTimeout(() => {
                setloginErr("");
            }, 2000);
            showNotification("error", "Add Sale: "+response.message);
        }

        clearForm();
        getSales();
    }

    return (
            <div className='flex flex-wrap w-screen justify-center'>
                {sales.length > 0 &&
                    <MaxWTableCard children={
                        <div className=''>
                            <FormTitle text='Sales:'/>
                            <div className='overflow-x-scroll'>
                                <table className='border text-center overflow-x-scroll'>
                                    <thead>
                                    <tr className='table-row'>
                                        <TableColHeader title={"Id"} />
                                        <TableColHeader title={"Date"} />
                                        <TableColHeader title={"Customer Name"} />
                                        <TableColHeader title={"Email"} />
                                        <TableColHeader title={"Phone"} />
                                        {/*<TableColHeader title={"Services"} />*/}
                                        {/*<TableColHeader title={"Products"} />*/}
                                        <TableColHeader title={"Bill Amount"} />
                                        <TableColHeader title={"Discount Amount"} />
                                        <TableColHeader title={"Paid Amount"} />
                                        <TableColHeader title={"Sale By"} />
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        sales && sales.map(item => {
                                            return (
                                                <tr key={item._id} className='table-row'>
                                                    <TableDataCell data={item.id} />
                                                    <TableDataCell data={new Date(item.createdAt).toLocaleDateString()} />
                                                    <TableDataCell data={item.name} />
                                                    <TableDataCell data={item.email} />
                                                    <TableDataCell data={item.phone} />
                                                    {/*<TableDataCell data={item.services} />*/}
                                                    {/*<TableDataCell data={item.products} />*/}
                                                    <TableDataCell data={item.billAmount} />
                                                    <TableDataCell data={item.discountAmount} />
                                                    <TableDataCell data={item.paidAmount} />
                                                    <TableDataCell data={item.saleBy} />
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    } />
                }

                <FormCard child={
                    <div className=''>
                        <FormTitle text='Add Sale:'/>

                        <FormInput label={"First Name"} type={"text"} placeHolder={"First Name"}
                                   onChangeCallback={setFirstName} />

                        <FormInput label={"Last Name"} type={"text"} placeHolder={"Last Name"}
                                   onChangeCallback={setLastName} />

                        <FormInput label={"Email"} type={"email"} placeHolder={"Email"}
                                   onChangeCallback={setEmail} />

                        <FormInput label={"Phone"} type={"text"} placeHolder={"Phone Number"}
                                   onChangeCallback={setPhone} />

                        <FormInput label={"Date Of Birth"} type={"date"} placeHolder={"DOB"}
                                   onChangeCallback={setDob} />

                        <FormDynamicInput label={"Services"} selectedList={selectedServices}
                                          setSelectedList={setSelectedServices} selectList={addedServices} />

                        <FormDynamicInput label={"Additional Products"} selectedList={selectedProducts}
                                          setSelectedList={setSelectedProducts} selectList={addedProducts} />

                        <FormInput disabled={true} label={"Bill Amount"} type={"number"} placeHolder={totalBillAmount}
                                   onChangeCallback={() => {}} />

                        <FormInput label={"Discount Amount"} type={"number"} placeHolder={"Discount Amount"} onChangeCallback={setDiscountAmount} />

                        <FormInput label={"Paid Amount"} type={"number"} placeHolder={"Paid Amount"} onChangeCallback={setPaidAmount} />

                        <div className='flex flex-col items-center justify-between mt-3 flex-wrap'>
                            <button disabled={loading?true:""} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2
                                px-4 rounded focus:outline-none focus:shadow-outline' type="submit"
                                    onClick={() => {addSaleHandler();}}>{loading ? "Processing.." : "Submit"}</button>

                            <small className='inline-block align-baseline font-bold text-sm text-red-500 mt-1'>
                                {loginErr}</small><br></br>
                        </div>
                    </div>
                } />
            </div>
    )
}