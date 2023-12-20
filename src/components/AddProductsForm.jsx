import React, {useEffect, useState} from "react";
import FormTitle from "./FormTitle.jsx";
import FormInput from "./FormInput.jsx";
import FormDynamicInput from "./FormDynamicInput.jsx";
import {getRequest, postRequest} from "../utils/apiHandler.js";
import TableColHeader from "./TableColHeader.jsx";
import TableDataCell from "./TableDataCell.jsx";
import EditToolTip from "./EditToolTip.jsx";
import removeImg from "../assets/remove.png";

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
        }else {
            props.showNotification("error", "fetch Products: "+response.message);
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
            props.showNotification("error", "fetch Services: "+response.message);
        }
    }

    useEffect(() => {
        console.log(addedServices);
        getProducts();
        getServices();
    }, []);


    async function addProductHandler(){
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
            props.showNotification("success", "Add product success");
        }else {
            setloginErr(response.message);
            setTimeout(() => {
                setloginErr("");
            }, 2000);
            props.showNotification("error", "Error: "+response.message);
        }

        getProducts();
    }

    return (
        <div className='flex flex-wrap w-screen justify-center'>
            {addedProducts.length > 0 &&
            <div className='bg-white shadow-lg mx-1 rounded px-8 pt-6 pb-5 mb-4 mt-5 w-full sm:w-4/6'>
                <FormTitle text='Added Products:'/>
                <EditToolTip />
                <div className='overflow-x-scroll'>
                    <table className='border text-center'>
                    <thead>
                        <tr className='table-row'>
                            <TableColHeader title={"Category"} />
                            <TableColHeader title={"Name"} />
                            <TableColHeader title={"Description"} />
                            <TableColHeader title={"Is For Sale"} />
                            <TableColHeader title={"Stock"} />
                            <TableColHeader title={"Unit Cost"} />
                            <TableColHeader title={"Selling Price"} />
                            <TableColHeader title={"Service Sale Count"} />
                            <TableColHeader title={"Direct Sale Count"} />
                            <TableColHeader title={"Rating"} />
                            <TableColHeader title={"DEL"} />
                        </tr>
                    </thead>
                    <tbody>
                    {
                        addedProducts && addedProducts.map(item => {
                            return (
                                <tr key={item._id} className='table-row'>
                                    <TableDataCell
                                        refreshFn={getProducts}
                                        token={props.token}
                                        collection={'product'}
                                        editable={true}
                                        id={item._id}
                                        showNotification={props.showNotification}
                                        key1="code"
                                        data={item.code} />
                                    <TableDataCell
                                        refreshFn={getProducts}
                                        token={props.token}
                                        collection={'product'}
                                        id={item._id}
                                        showNotification={props.showNotification}
                                        key1="name"
                                        data={item.name}
                                        editable={true} />
                                    <TableDataCell
                                        refreshFn={getProducts}
                                        token={props.token}
                                        collection={'product'}
                                        id={item._id}
                                        showNotification={props.showNotification}
                                        key1={"description"}
                                        editable={true}
                                        data={item.description} />
                                    <TableDataCell
                                        refreshFn={getProducts}
                                        token={props.token}
                                        collection={'product'}
                                        id={item._id}
                                        showNotification={props.showNotification}
                                        key1="isForSale"
                                        data={item.isForSale ? "Yes" : "No"} />
                                    <TableDataCell
                                        refreshFn={getProducts}
                                        token={props.token}
                                        collection={'product'}
                                        id={item._id}
                                        showNotification={props.showNotification}
                                        key1="stock"
                                        data={item.stock || 1} />
                                    <TableDataCell
                                        refreshFn={getProducts}
                                        token={props.token}
                                        editable={true}
                                        type={"number"}
                                        collection={'product'}
                                        id={item._id}
                                        showNotification={props.showNotification}
                                        key1="unitCost"
                                        data={item.unitCost} />
                                    <TableDataCell
                                        refreshFn={getProducts}
                                        token={props.token}
                                        editable={true}
                                        type={"number"}
                                        collection={'product'}
                                        id={item._id}
                                        showNotification={props.showNotification}
                                        key1="sellingPrice"
                                        data={item.sellingPrice} />
                                    <TableDataCell
                                        refreshFn={getProducts}
                                        token={props.token}
                                        collection={"product"}
                                        id={item._id}
                                        showNotification={props.showNotification}
                                        key1="serviceSaleCount"
                                        data={item.serviceSaleCount} />
                                    <TableDataCell
                                        refreshFn={getProducts}
                                        token={props.token}
                                        collection={"product"}
                                        id={item._id}
                                        showNotification={props.showNotification}
                                        key1="directSaleCount"
                                        data={item.directSaleCount} />
                                    <TableDataCell
                                        refreshFn={getProducts}
                                        token={props.token}
                                        collection={"product"}
                                        id={item._id}
                                        showNotification={props.showNotification}
                                        key1="rating"
                                        data={item.rating} />
                                    <TableDataCell
                                        refreshFn={getProducts}
                                        token={props.token}
                                        collection={"product"}
                                        id={item._id}
                                        action={"delete"}
                                        showNotification={props.showNotification}
                                        data={
                                        <img className={'w-10'} src={removeImg} alt={"delete"} />
                                        } />
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
                <FormTitle text='Add A Product:'/>
                <FormInput label={"Product Category"} type={"text"} placeHolder={"Category"} onChangeCallback={setCode} />
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
                            onClick={() => {addProductHandler();}}>{loading ? "Processing.." : "Submit"}</button>

                    <small className='inline-block align-baseline font-bold text-sm text-red-500 mt-1'>
                        {loginErr}</small><br></br>
                </div>
            </div>
        </div>

    );
}