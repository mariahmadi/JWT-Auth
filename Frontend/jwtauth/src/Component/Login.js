import react, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../PostComponent/UseAuth'




const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate('')
    const [msg, setMsg] = useState('')
    const { login, authed } = useAuth()
    const { state } = useLocation()

    const Auth = async (e) => {

        e.preventDefault()

        try {

            await axios.post('http://localhost:5000/Login', { email: email, password: password, authed: authed })

            login().then(() => {

                navigate("/Contact")


                console.log(window.localStorage)

            })
        }
        catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg)
                console.log(error.response.data)
            }
        }

    }

    return (


        <div>


            <section>

                <form onSubmit={Auth}>
                    <label>Email</label>
                    <input type="text" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <label>password</label>
                    <input type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>

                    <button>Submit</button>
                    <br />
                    <a href='/register'>Sign Up</a>
                </form>

            </section>
        </div>

    )

}

export default Login