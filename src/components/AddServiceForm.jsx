import React, {useEffect, useState} from "react";
import FormTitle from "./FormTitle.jsx";
import FormInput from "./FormInput.jsx";
import FormDynamicInput from "./FormDynamicInput.jsx";
import {getRequest, postRequest} from "../utils/apiHandler.js";
import TableColHeader from "./TableColHeader.jsx";
import TableDataCell from "./TableDataCell.jsx";

export default function AddServiceForm(props){

    const [name, setName] = useState("");
    const [unitCost, setunitcost] = useState(0);
    const [description, setdescription] = useState("");
    const [sellingPrice, setsellingPrice] = useState(0);
    const [serviceTime, setserviceTime] = useState(0);
    const [productsIncluded, setproductsIncluded] = useState([]);
    const [addedProducts, setaddedProducts] = useState([]);
    const [addedServices, setAddedServices] = useState([]);
    const [code, setCode] = useState(null);
    const [loading, setloading] = useState(false);
    const [loginErr, setloginErr] = useState("");


    async function getProducts() {
        console.log(props.token);
        const response = await getRequest('get-products', {}, {
            token: `${props.token}`
        });

        if (response.status === 200){
            setaddedProducts(response.data.products);
        }else if (response.status === 401){
            props.logoutFn();
        }else {
            props.showNotification("error", "fetch products: "+response.message);
        }
    }

    async function getServices() {
        console.log(props.token);
        const response = await getRequest('get-services', {}, {
            token: `${props.token}`
        });

        if (response.status === 200){
            setAddedServices(response.data.services);
        }else if (response.status === 401){
            props.logoutFn();
        }else {
            props.showNotification("error", "fetch services: "+response.message);
        }
    }

    useEffect(() => {
        getProducts();
        getServices();
    }, []);


    async function addServiceHandler(){
        const response = await postRequest('/add-service', {}, {token: props.token}, {
            name,
            code,
            description,
            unitCost,
            sellingPrice,
            serviceTime,
            products: productsIncluded
        });

        console.log("save services form response", response);
        if (response.status === 200){
            console.log("Add service success", response.message);
            props.showNotification("success", "Add service success");
        }else {
            setloginErr(response.message);
            setTimeout(() => {
                setloginErr("");
            }, 2000);
            props.showNotification("error", "Error: "+response.message);
        }

        getServices();
    }

    return (
        <div className='flex flex-wrap w-screen justify-center'>
            {addedServices.length > 0 &&
            <div className='bg-white shadow-lg mx-1 rounded px-4 pt-6 pb-5 mb-4 mt-5 w-full sm:w-4/6'>
                <FormTitle text='Added Services:'/>
                <div className='overflow-x-scroll'>
                    <table className='border text-center'>
                        <thead>
                            <tr className='table-row'>
                                <TableColHeader title={"Category"} />
                                <TableColHeader title={"Name"} />
                                <TableColHeader title={"Description"} />
                                <TableColHeader title={"Unit Cost"} />
                                <TableColHeader title={"Selling Price"} />
                                <TableColHeader title={"Service Time"} />
                                <TableColHeader title={"Sale Count"} />
                                <TableColHeader title={"Last Sale At"} />
                                <TableColHeader title={"Last Sale By"} />
                                <TableColHeader title={"Rating"} />
                            </tr>
                        </thead>
                        <tbody>
                        {
                            addedServices && addedServices.map(item => {
                                return (
                                    <tr key={item._id} className='table-row'>
                                        <TableDataCell data={item.code} />
                                        <TableDataCell data={item.name} />
                                        <TableDataCell data={item.description} />
                                        <TableDataCell data={item.unitCost} />
                                        <TableDataCell data={item.sellingPrice} />
                                        <TableDataCell data={item.serviceTime} />
                                        <TableDataCell data={item.saleCount} />
                                        <TableDataCell data={item.lastSaleAt || "null"} />
                                        <TableDataCell data={item.lastSaleBy || "null"} />
                                        <TableDataCell data={item.rating || 0} />
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            }
            <div className='bg-white shadow-lg rounded px-8 pt-6 pb-1 mb-4 mt-5 sm:max-w-md max-w-sm'>
                <FormTitle text='Add A Service:'/>
                <FormInput label="Category" type="text" placeHolder="Service Category" onChangeCallback={setCode} />
                <FormInput label="Name" type="text" placeHolder="Service Name" onChangeCallback={setName} />
                <FormInput label="Description" type="text" placeHolder="Brief description"
                           onChangeCallback={setdescription} />
                <FormInput label="Unit Cost" type="number" placeHolder="Per unit cost in INR"
                           onChangeCallback={setunitcost} />
                <FormInput label="Selling Price" type="number" placeHolder="Selling Price in INR"
                           onChangeCallback={setsellingPrice} />
                <FormInput label="service Time" type="number" placeHolder="Service time in minutes"
                           onChangeCallback={setserviceTime} />
                <FormDynamicInput label="Products" selectList={addedProducts}
                                  selectedList={productsIncluded}  setSelectedList={setproductsIncluded}/>
                <div className='flex flex-col items-center justify-between mt-3'>
                    <button disabled={loading?true:""} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2
                px-4 rounded focus:outline-none focus:shadow-outline' type="submit"
                            onClick={() => {addServiceHandler();}}>{loading ? "Processing.." : "Submit"}</button>

                    <small className='inline-block align-baseline font-bold text-sm text-red-500 mt-1'>
                        {loginErr}</small><br></br>
                </div>
            </div>
        </div>

    );
}