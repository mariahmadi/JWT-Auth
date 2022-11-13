import react, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../PostComponent/UseAuth'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { fas } from '@fortawesome/free-solid-svg-icons'


const Login = () => {

    const navigate = useNavigate('')
    const { login, authed } = useAuth()

    const schema = yup.object().shape({
        email: yup.string().required(),
        password: yup.string().required()
    })
    const { register, reset, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })
    const Auth = async (data) => {
        try {

            await axios.post('http://localhost:5000/Login', { data })

            reset()

            login().then(() => {

                navigate("/Contact")
                window.location.reload()

            })
        }
        catch (error) {
            if (error.response) {
                console.log(error.response.data)
            }
        }
    }

    return (

        <div >

            <section className="section">

                <form calss="box" onSubmit={handleSubmit(Auth, onerror)}>
                    <div className="Login">
                        <div className="field">
                            <label className="label">Email </label>
                            <input className="input is-rounded  is-info" name='email' {...register('email', { required: true })}></input>
                            {errors?.email && errors.email.message}
                        </div>

                        <div className="field">

                            <label className="label">Password</label>
                            <input className="input is-rounded is-info" type="password" name='password' {...register('password', { required: true })}></input>
                            {errors?.password && errors.password.message}
                        </div>
                        <button className='button is-primary is-rounded' type='submit'>Submit</button>
                        <br />
                        <a href='/ForgetPass'>Forget Password</a>
                        <br />
                        <a className="link" href='/register'>Sign Up</a>
                    </div>
                </form>
                

            </section>
        </div>

    )

}

export default Login