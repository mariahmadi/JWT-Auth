import React, { useState } from "react";
import axios from "axios";


const ForgetPassWord = () => {

    const [email, setEmail] = useState('')
    const handleReset = (e) => {
        e.preventDefault()

        try {
            axios.post('http://localhost:5000/Reset', { email: email })
                .then((res) => {
                    console.log(res.data)
                    return (
                        <div class="field">
                            <div class="control is-medium is-loading">
                                <input class="input is-medium is-primary" type="text" placeholder="Check Your Email" readOnly />

                                <progress class="progress is-small is-primary" max="100">15%</progress>

                            </div>
                        </div>)
                })
        } catch (error) {
            console.log(error)
        }




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