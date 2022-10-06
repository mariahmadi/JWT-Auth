import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import Nav from "./Component/Navbar";
import Dashboard from "./Component/Dashboard";
import Login from "./Component/Login";
import Register from "./Component/Register";
import AddPost from "./PostComponent/Post";
import { useAuth } from "./PostComponent/UseAuth";
import { useNavigate, useLocation } from "react-router-dom";
import Contact from "./Component/Contact";
import Home from "./Component/Home";
import Fetched from "./PostComponent/MyPost";
import Uploaded from "./Component/Profile";
function App() {

  const ReqiredAuth = ({ children }) => {
    const { authed } = useAuth()
    const location = useLocation()
    console.log(authed)

    return authed === true ? (children) : (<Navigate to='/Login' state={{ path: location.pathname }} />)
  }
  return (

    <div>

      <BrowserRouter>
        <Nav />
        <Routes>

          <Route path='/Login' element={<Login />} />
          <Route path="/" element={<Home />}></Route>
          <Route path='/Contact' element={
            <ReqiredAuth>
              <Contact />
            </ReqiredAuth>} />
          <Route path='/Dashboard' element={

            <ReqiredAuth>
              <Dashboard />
            </ReqiredAuth>

          } />
          <Route path="/Profile" element={<Uploaded />}></Route>
          <Route path="MyPost" element={
            <ReqiredAuth>
              <Fetched />
            </ReqiredAuth>}>

          </Route>


          <Route path='/Register' element={<Register />} />

          <Route path='/Add' element={
            <ReqiredAuth>
              <AddPost />
            </ReqiredAuth>} />

        </Routes >
      </BrowserRouter>
    </div>
  );
}

export default App;
