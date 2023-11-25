import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import NoPage from './pages/NoPage';
import Login from "./pages/login.jsx";
import Services from "./pages/services.jsx";
import React, {useState} from "react";
import Products from "./pages/products.jsx";
import Profile from "./pages/profile.jsx";

function App() {

    const [token, setToken] = useState("");
    const [admin, setAdmin] = useState(null);

    const tok = localStorage.getItem("token");
    if(!token) {
        if (tok && tok !== ""){
            //console.log("token", tok);
            setToken(tok);
        }else{
            //console.log("redirect to login");
            return <Login setToken={setToken} setAdmin={setAdmin}/>
        }
    }else{
        //console.log("returned home");
    }

    function logout(){
        localStorage.clear();
        setToken(null);
        setAdmin(null);
    }

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home logoutFn={logout} token={token} admin={admin}/>} />
          <Route path="/login" element={<Login setToken={setToken} setAdmin={setAdmin} />} />
          <Route path="/services" element={<Services logoutFn={logout} token={token}/> } />
          <Route path="/products" element={<Products logoutFn={logout} token={token}/> } />
          <Route path="/profile" element={<Profile logoutFn={logout} token={token} admin={admin} /> } />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
