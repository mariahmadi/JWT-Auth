import React, { useState } from "react";
import axios from "axios";


const ForgetPassWord = () => {

    const [email, setEmail] = useState('')
    const handleReset = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/Reset', { email: email })
            .then((res) => {
                console.log(res.data)
            })

    }
    return (
        <section className="section">
            <div className="ForgetPass">
                <form className="box" onSubmit={handleReset}>
                    <label className="label">Email</label>
                    <input className="input is-link is-rounded" placeholder="Please Enter Your Email" onChange={(e) => { setEmail(e.target.value) }}></input>
                    <br />
                    <br />
                    <button className="button is-link is-rounded" type="submit" > Send</button>
                </form>
            </div>
        </section>
    )
}
export default ForgetPassWord