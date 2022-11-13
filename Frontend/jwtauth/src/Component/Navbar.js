import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from "../PostComponent/UseAuth";
import { FaHeart } from 'react-icons/fa'

const Nav = () => {

    const navigate = useNavigate()
    const { logout, authed } = useAuth()
    useEffect(() => {

    }, [])
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
            <div className="Navbar">
                <nav className="navbar is-link " role="navigation" aria-label="main navigation">
                    <div className="navbar-menu">
                        <div className="navbar-start">
                            <Link className="navbar-item" to="/">Home</Link>
                            <a className="navbar-item">
                                Documentation
                            </a>
                            <div className="navbar-item">

                                <Link className="  button is-danger is-rounded" to="/Add">Add Post</Link>
                            </div>

                            <div className="navbar-item has-dropdown is-hoverable ">
                                <a className="navbar-link">
                                    More
                                </a>

                                <div className="navbar-dropdown">
                                    <Link className="navbar-item" to="/Profile">Profile</Link>
                                    <Link className="navbar-item" to="/Dashboard">Dashboard</Link>
                                    <Link className="navbar-item" to="/Contact">Contact</Link>
                                    <Link className="navbar-item" to="/MyPost">My Post</Link>

                                    <hr className="navbar-divider" />
                                    <a className="navbar-item">
                                        Report an issue
                                    </a>
                                </div>
                            </div>
                        </div>


                        <div className="navbar-end">
                            <div className="navbar-item">

                                <h1><FaHeart style={{ color: 'red', fontSize: '35px' }} /></h1>
                                &nbsp;&nbsp;&nbsp;
                                <div className="buttons">
                                    <Link className="button is-primary" to="/Register"><strong>Sign up</strong></Link>

                                    <Link className="button is-light" to="/Login"> Log in</Link>
                                    {authed && <button className="button is-warning" onClick={Logout}>Logout</button>}
                                </div>
                            </div>
                        </div>
                    </div >
                </nav >


            </div >

        </>
    )



}
export default Nav