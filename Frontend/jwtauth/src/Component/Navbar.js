import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from "../PostComponent/UseAuth";

const Nav = () => {
   
    const navigate = useNavigate()
    const { logout, authed } = useAuth()
   
    const Logout = () => {
        try {
            axios.delete('http://localhost:5000/Logout')

            logout()

            console.log("logout")

        } catch (error) {
            if (error.response) {
                console.log(error.response.data)
            }
        }


    }

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/Login">Login</Link>
                    </li>
                    <li>
                        <Link to="/Profile">Profile</Link>
                    </li>
                    <li>
                        <Link to="/Dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/Register">Register</Link>
                    </li>
                    <li>
                        <Link to="/Contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/Add">Add Post</Link>
                    </li>
                    <li>
                        <Link to="/MyPost">My Post</Link>
                    </li>

                </ul>
                
            </nav>
           {authed && <button onClick={Logout}>Logout</button>}
            
        </>
    )



}
export default Nav