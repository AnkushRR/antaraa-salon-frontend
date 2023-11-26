import React, {useEffect, useState} from "react";
import FormTitle from "./FormTitle.jsx";
import FormInput from "./FormInput.jsx";
import FormDynamicInput from "./FormDynamicInput.jsx";
import {getRequest, postRequest} from "../utils/apiHandler.js";
import TableColHeader from "./TableColHeader.jsx";
import TableDataCell from "./TableDataCell.jsx";

export default function (props){

    const [name, setName] = useState("");
    const [unitCost, setunitcost] = useState(0);
    const [description, setdescription] = useState("");
    const [sellingPrice, setsellingPrice] = useState(0);
    const [addedProducts, setaddedProducts] = useState([]);
    const [addedServices, setAddedServices] = useState([]);
    const [stock, setStock] = useState(1);
    const [code, setCode] = useState(null);
    const [isForSale, setIsForSale] = useState(true);
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
        }
    }

    useEffect(() => {
        getProducts();
        getServices();
    }, []);


    async function addServiceHandler(){
        const response = await postRequest('/add-product', {}, {token: props.token}, {
            name,
            code,
            stock,
            description,
            unitCost,
            sellingPrice,
            isForSale
        });

        console.log("save products form response", response);
        if (response.status === 200){
            console.log("Add products success", response.message);
        }else {
            setloginErr(response.message);
            setTimeout(() => {
                setloginErr("");
            }, 2000);
        }

        getProducts();
    }

    return (
        <div className='flex flex-wrap w-screen justify-center'>
            {addedProducts.length > 0 &&
            <div className='bg-white shadow-lg mx-1 rounded px-8 pt-6 pb-5 mb-4 mt-5 max-w-full overflow-auto'>
                <FormTitle text='Added Products:'/>
                <table className='border text-center'>
                    <thead>

                        <tr className='table-row'>
                            <TableColHeader title={"Code"} />
                            <TableColHeader title={"Name"} />
                            <TableColHeader title={"Description"} />
                            <TableColHeader title={"Is For Sale"} />
                            <TableColHeader title={"Stock"} />
                            <TableColHeader title={"Unit Cost"} />
                            <TableColHeader title={"Selling Price"} />
                            <TableColHeader title={"Service Sale Count"} />
                            <TableColHeader title={"Direct Sale Count"} />
                            <TableColHeader title={"Rating"} />
                        </tr>
                    </thead>
                    <tbody>
                    {
                        addedProducts && addedProducts.map(item => {
                            return (
                                <tr className='table-row'>
                                    <TableDataCell data={item.code} />
                                    <TableDataCell data={item.name} />
                                    <TableDataCell data={item.description} />
                                    <TableDataCell data={item.isForSale ? "Yes" : "No"} />
                                    <TableDataCell data={item.stock || 1} />
                                    <TableDataCell data={item.unitCost} />
                                    <TableDataCell data={item.sellingPrice} />
                                    <TableDataCell data={item.serviceSaleCount} />
                                    <TableDataCell data={item.directSaleCount} />
                                    <TableDataCell data={item.rating} />
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
            }
            <div className='bg-white shadow-lg rounded px-8 pt-6 pb-1 mb-4 mt-5 sm:max-w-md max-w-sm'>
                <FormTitle text='Add A Product:'/>
                <FormInput label={"Product Code"} type={"text"} placeHolder={"Code"} onChangeCallback={setCode} />
                <FormInput label="Name" type="text" placeHolder="Product Name" onChangeCallback={setName} />
                <FormInput label="Description" type="text" placeHolder="Brief description"
                           onChangeCallback={setdescription} />
                <FormInput label="Unit Cost" type="number" placeHolder="Per unit cost in INR"
                           onChangeCallback={setunitcost} />
                <FormInput label="Selling Price" type="number" placeHolder="Selling Price in INR"
                           onChangeCallback={setsellingPrice} />

                <FormInput label={"Stock Units"} type={"number"} placeHolder={"Stock Quantity"} onChangeCallback={setStock} />

                <FormInput label={"Is For Sale"} type={"checkbox"} placeHolder={""} onChangeCallback={setIsForSale} valueState={isForSale} />

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