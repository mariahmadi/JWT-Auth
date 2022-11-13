import React, { useState } from "react";
import axios from 'axios'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";


const Reset = () => {


    const search = window.location.search
    const sp = new URLSearchParams(search)
    const token = sp.get("token")
    const id = sp.get('id')



    const schema = yup.object().shape({
        password: yup.string().required(),
        confirmpassword: yup.string().required()
    })
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

    const onsubmit = data => {
        try {
            if (data.password === data.confirmpassword) {
                axios.post("http://localhost:5000/NewPass", { data: data, token: token, id: id })
                console.log(data)
            }
            else {
                console.log("Password Not Matched Try Again")
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <form className="box" onSubmit={handleSubmit(onsubmit, onerror)}>
            <label className="label">Password </label>
            <input className="input is-rounded is-link" name="password" {...register('password', { required: true })} />
            {errors?.password && errors.password.message}
            <label className="label">Confirm Password  </label>
            <input className="input is-rounded is-link" name="confirmpassword" {...register('confirmpassword', { required: true })} />
            {errors?.confirmpassword && errors.confirmpassword.message}
            <button className="button is-rounded is-primary" type="submit">Submit</button>
        </form>
    )
}
export default Reset