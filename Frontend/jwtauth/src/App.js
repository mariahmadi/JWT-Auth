import React from "react";
import { Routes, Route, BrowserRouter, Navigate, useParams } from 'react-router-dom'
import Nav from "./Component/Navbar";
import Dashboard from "./Component/Dashboard";
import Login from "./Component/Login";
import Register from "./Component/Register";
import AddPost from "./PostComponent/Addpost";
import { useAuth } from "./PostComponent/UseAuth";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import Contact from "./Component/Contact";
import Home from "./Component/Home";
import Fetched from "./PostComponent/MyPost";
import Uploaded from "./Component/Profile";
import ForgetPassWord from "./Component/ForgetPass";
import Reset from "./Component/ResetPassword";
import ShowPost from "./PostComponent/ShowMyPost";
import HomePost from "./PostComponent/HomePost";
import AddComment from "./PostComponent/AddComment";


function App() {

  const ReqiredAuth = ({ children }) => {
    const { authed } = useAuth()
    const location = useLocation()

    return authed === true ? (children) : (<Navigate to='/Login' state={{ path: location.pathname }} />)
  }

  return (

    <div>

      <BrowserRouter>
        <Nav />
        <Routes>

          <Route path='/Login' element={<Login />} />
          <Route path="ForgetPass" element={<ForgetPassWord />} />
          <Route path="/" element={
            <>
              <Home />
            


            </>
          }></Route>
          <Route path='/Contact' element={
            <ReqiredAuth>
              <Contact />
            </ReqiredAuth>} />

          <Route path="/MyPost/Post/:id" element={<ShowPost />} />
          <Route path="/Post/" element={<HomePost />} >

            <Route path=":id" element={<AddComment />} />


          </Route>


          <Route path='/Dashboard' element={

            <ReqiredAuth>
              <Dashboard />
            </ReqiredAuth>

          } />
          <Route path="/Resetpass" element={<Reset />} />
          <Route path="/Profile" element={
            <ReqiredAuth>
              <Uploaded />
            </ReqiredAuth>} />
          <Route path="/MyPost" element={
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
