import React, {useEffect, useState} from "react";
import FormTitle from "./FormTitle.jsx";
import FormInput from "./FormInput.jsx";
import {getRequest, postRequest} from "../utils/apiHandler.js";
import TableColHeader from "./TableColHeader.jsx";
import TableDataCell from "./TableDataCell.jsx";
import MaxWTableCard from "./MaxWTableCard.jsx";
import FormCard from "./FormCard.jsx";
import utcToIST from "../hooks/utcToIST.js";

export default function ({token, logoutFn, showNotification}){

    const [employees, setEmployees] = useState([]);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [department, setDepartment] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const [loading, setloading] = useState(false);
    const [loginErr, setloginErr] = useState("");

    async function getEmployees() {
        console.log(token);
        const response = await getRequest('get-employees', {}, {
            token: `${token}`
        });

        if (response.status === 200){
            setEmployees(response.data.employees);
        }else if (response.status === 401){
            logoutFn();
        }else {
            showNotification("error", "error in fetching employees "+response.message);
        }
    }

    useEffect(() => {
       getEmployees();
    }, []);


    async function addEmployeeHandler(){
        const response = await postRequest('/add-employee', {}, {token: token}, {
            firstName,
            lastName,
            email,
            phone,
            department,
            role,
            password
        });

        console.log("Add Employee form response", response);
        if (response.status === 200){
            console.log("Add Employee success", response.message, response.data);
            showNotification("success", "Add Employee success");
        }else {
            setloginErr(response.message);
            setTimeout(() => {
                setloginErr("");
            }, 2000);
            showNotification("error", "Add Employee: "+response.message);
        }

        getEmployees();
    }

    return (
            <div className='flex flex-wrap w-screen justify-center'>
                {employees.length > 0 &&
                    <MaxWTableCard children={
                        <div className=''>
                            <FormTitle text='Employees:'/>
                            <div className='overflow-x-scroll'>
                                <table className='border text-center overflow-x-scroll'>
                                    <thead>
                                    <tr className='table-row'>
                                        <TableColHeader title={"UserName"} />
                                        <TableColHeader title={"Name"} />
                                        <TableColHeader title={"Email"} />
                                        <TableColHeader title={"Phone"} />
                                        <TableColHeader title={"Department"} />
                                        <TableColHeader title={"Role"} />
                                        <TableColHeader title={"Last Login At"} />
                                        <TableColHeader title={"Status"} />
                                        <TableColHeader title={"Rating"} />
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        employees && employees.map(item => {
                                            return (
                                                <tr key={item._id} className='table-row'>
                                                    <TableDataCell data={item.userName} />
                                                    <TableDataCell data={item.firstName+" "+item.lastName} />
                                                    <TableDataCell data={item.email} />
                                                    <TableDataCell data={item.phone} />
                                                    <TableDataCell data={item.department} />
                                                    <TableDataCell data={item.role} />
                                                    <TableDataCell data={utcToIST(item.lastLoginAt)} />
                                                    <TableDataCell data={item.status} />
                                                    <TableDataCell data={item.rating} />
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
                        <FormTitle text='Add Employee:'/>

                        <FormInput label={"First Name"} type={"text"} placeHolder={"First Name"} onChangeCallback={setFirstName} />

                        <FormInput label={"Last Name"} type={"text"} placeHolder={"Last Name"} onChangeCallback={setLastName} />

                        <FormInput label={"Email"} type={"text"} placeHolder={"Email"} onChangeCallback={setEmail} />

                        <FormInput label={"Phone"} type={"text"} placeHolder={"Phone Number"} onChangeCallback={setPhone} />

                        <FormInput label={"Department"} type={"text"} placeHolder={"Department"} onChangeCallback={setDepartment} />

                        <FormInput label={"Role"} type={"dropdown"} placeHolder={"Admin Role"} onChangeCallback={setRole} options={["manager", "staff"]} />

                        <FormInput label={"Password"} type={"text"} placeHolder={"Password"} onChangeCallback={setPassword} />

                        <div className='flex flex-col items-center justify-between mt-3 flex-wrap'>
                            <button disabled={loading?true:""} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2
                                px-4 rounded focus:outline-none focus:shadow-outline' type="submit"
                                    onClick={() => {addEmployeeHandler();}}>{loading ? "Processing.." : "Submit"}</button>

                            <small className='inline-block align-baseline font-bold text-sm text-red-500 mt-1'>
                                {loginErr}</small><br></br>
                        </div>
                    </div>
                } />
            </div>
    )
}