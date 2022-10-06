import React, { useState, useRef, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confpassword, setconfPassword] = useState('')
    const [msg, setMsg] = useState('')
    const navigate = useNavigate()

  

    const register = async (e) => {
        e.preventDefault()

        try {

            await axios.post('http://localhost:5000/user', {
                name: name,
                email: email,
                password: password,
                confpassword: confpassword
            })

            console.log(name, email)
            navigate('/Contact')
        }
        catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg)


                console.log(error.response.data)

            }

        }

    }
    return (
        <section>
            <div>
                <form onSubmit={register} >
                    <label>Name : </label>
                    <input type="text" placeholder="Enter the Name" value={name} onChange={(e) => setName(e.target.value)}></input>
                    <label>Email : </label>
                    <input type="text" placeholder="Enter the Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <label>Password : </label>
                    <input type="password" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    <label>Confirm Password : </label>
                    <input type="password" placeholder="******" value={confpassword} onChange={(e) => setconfPassword(e.target.value)}></input>
                    <button>Register</button>


                </form>
            </div>


        </section>


    )
}
export default Register