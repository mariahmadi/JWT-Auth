import React from "react";
import { useAuth } from "../PostComponent/UseAuth";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const Contact = () => {
    const [edit, setEdit] = useState(false)
    const inputref = useRef(null)

    const { authed, logout } = useAuth()


    const Send = () => {

        console.log(edit)
        const gete = inputref.current.value
        return (<div>
            <h2>Hello</h2>
            <h3>{inputref.current.focus()}</h3>
            <h2>{gete}</h2>
        </div>)

    }

    return (
        <>
            <section className="section">
                <div className="Conatct">
                    <div className="field">

                        {edit && Send()}
                        <h1>contact me </h1>
                        <input className="input is-rounded" placeholder="This Is Fake" ref={inputref}></input>
                        <button className="button is rounded is-primary" onClick={() => {

                            setEdit(true)
                            Send()
                        }}>Contact</button>
                    </div>
                </div>
            </section>

        </>

    )
}
export default Contact