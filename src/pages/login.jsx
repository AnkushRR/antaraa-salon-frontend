import React, {useState} from 'react';
import {postRequest} from '../utils/apiHandler';
import Home from "./home.jsx";
import Header from "../components/Header.jsx";


export default function Login({setToken, setAdmin, notifications, showNotification}) {
    
    const [email, setemail] = useState();
    const [password, setPassword] = useState();
    const [loginErr, setLoginErr] = useState();
    const [loading, setLoading] = useState(false);

    const tok = localStorage.getItem("token");
    if (tok){
        return <Home />
    }

    const handleSubmit = async e => {
        setLoading(true)
        e.preventDefault();
        const data = await postRequest('login', {}, {}, {email: email, password: password});
        console.log("data", data);
        if (data.status === 200){
            localStorage.setItem("token", data.data.token);
            if (setToken)
                setToken(data.data.token);
            if (setAdmin)
                setAdmin(data.data.admin);
            setLoginErr(null);
            //console.log()
        }else{
            localStorage.clear();
            setLoginErr(data.message);
            //console.log("error state updated", data.message);
            setTimeout(() => {
                setLoginErr("");
                setLoading(false);
              }, 10000);
            showNotification("error", data.message);
        }

        setLoading(false);
        
      }

  return(
    <div className='space-y-16'>
        <Header currentPageTitle="Login" logoutFn={null} otherLinks={[]} notifications={notifications} />

        <div className='p-3 bg-white shadow-lg rounded px-8 pt-6 pb-5 mb-4 max-w-sm mx-3 sm:mx-auto'>
            <p className='text-2xl font-semibold text-center text-slate-600 font-serif'>Admin Login</p>
            <div className='mt-4'>
                <form className='space-y-2'>
                    <div className="">
                        <label className='block text-gray-900 text-sm font-bold mb-1'>
                            Email:
                        </label>
                        <input className='shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline' onChange={e => setemail(e.target.value)} type="text" id='email' aria-describedby='regHelp' name='email'/>
                    </div>
                    <div className="">
                        <label className='block text-gray-900 text-sm font-bold mb-1' >
                            Password:
                        </label>
                        <input className='shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline' onChange={e => setPassword(e.target.value)} type="password" id="password" name='password'/>
                    </div>
                    <br></br>
                    <div className='flex flex-col items-center justify-between'>
                        <button disabled={loading?true:""} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type="submit" onClick={handleSubmit}>{loading ? "Processing.." : "Submit"}</button>

                        <small className='inline-block align-baseline font-bold text-sm text-red-500 mt-1'>{loginErr}</small><br></br>
                    </div>
                </form>
            </div>
        </div>

    </div>
    
  )
}