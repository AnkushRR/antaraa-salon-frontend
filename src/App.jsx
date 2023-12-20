import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import NoPage from './pages/NoPage';
import Login from "./pages/login.jsx";
import Services from "./pages/services.jsx";
import React, {useState} from "react";
import Products from "./pages/products.jsx";
import Profile from "./pages/profile.jsx";
import Employees from "./pages/employees.jsx";
import Sales from "./pages/sales.jsx";
import Attendances from "./pages/attendances.jsx";

function App() {

    const [token, setToken] = useState("");
    const [admin, setAdmin] = useState(null);
    // notifications
    const [notifications, setNotifications] = useState([]);

    function showNotification(type, message, clearDelay=3000){
        const id = Date.now();
        setNotifications(prevState => {
            if (!prevState)
                return [{id, type, message}];
            return [...prevState, {id, type, message}]
        });

        setTimeout(() => {
            setNotifications(prevState => {
                if (prevState && prevState.length > 0){
                    return prevState.filter(item => item.id !== id);
                }else {
                    return prevState;
                }
            })
        }, clearDelay);
    }

    const tok = localStorage.getItem("token");
    if(!token) {
        if (tok && tok !== ""){
            //console.log("token", tok);
            setToken(tok);
        }else{
            //console.log("redirect to login");
            return <Login setToken={setToken} setAdmin={setAdmin} notifications={notifications} showNotification={showNotification}/>
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
              <Route path='/' element={
                  <Home logoutFn={logout} token={token} admin={admin}
                        notifications={notifications} showNotification={showNotification}
                  /> }
              />

              <Route path="/login" element={
                  <Login setToken={setToken} setAdmin={setAdmin} notifications={notifications}
                         showNotification={showNotification}
                  /> }
              />

              <Route path="/services" element={
                  <Services logoutFn={logout} token={token}
                            notifications={notifications} showNotification={showNotification}
                  /> }
              />

              <Route path="/products" element={
                  <Products logoutFn={logout} token={token}
                            notifications={notifications} showNotification={showNotification}
                  /> }
              />

              <Route path="/employees" element={
                  <Employees token={token} logoutFn={logout}
                             notifications={notifications} showNotification={showNotification}
                  /> }
              />

              <Route path="/profile" element={
                  <Profile logoutFn={logout} token={token} admin={admin}
                           notifications={notifications} showNotification={showNotification}
                  /> }
              />

              <Route path='/sales' element={
                  <Sales logoutFn={logout} token={token} notifications={notifications}
                           showNotification={showNotification}
                  /> }
              />

              <Route path='/attendances' element={
                  <Attendances logoutFn={logout} token={token} notifications={notifications}
                               showNotification={showNotification}
                  /> }
              />

              <Route path="*" element={ <NoPage /> } />
        </Routes>
      </BrowserRouter>
  )
}

export default App
