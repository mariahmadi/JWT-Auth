import React, { useState, useRef, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import '../index.css'

const Register = () => {

    const navigate = useNavigate()

    const schema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().required(),
        password: yup.string().required(),
        confpassword: yup.string().required()
    })

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })


    const submit = async (data) => {

        try {

            await axios.post('http://localhost:5000/user', {
                data
            })

            console.log(data)
            navigate('/Login')
        }
        catch (error) {
            if (error.response) {

                console.log(error.response.data)

            }

        }

    }
    return (

        <div>
            <form className="box" onSubmit={handleSubmit(submit, onerror)} >
                <div className="Reg">
                    <div className="field">
                        <label className="label">Name</label>
                        <input className="input is-rounded is-primary " name="name" {...register('name', { required: true })} />
                        {errors?.name && errors.name.message}
                    </div>

                    <div className="field">
                        <label className="label">Email</label>
                        <input className="input is-rounded is-primary" name="email" {...register('email', { required: true })} />
                        {errors?.email && errors.email.message}
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input className="input is-rounded is-primary" name="password" type="password" {...register('password', { required: true })} />
                            {errors?.password && errors.password.message}
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Confirm Password </label>
                        <input className="input is-rounded is-primary" name="confpassword" type="password" {...register('confpassword', { required: true })} />
                        {errors?.confpassword && errors.confpassword.message}
                    </div>
                    <button className="button is-rounded is-primary" type="submit">Register</button>

                </div>
            </form>
        </div>





    )
}
export default Register