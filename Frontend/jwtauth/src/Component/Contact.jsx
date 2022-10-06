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
            <div>

                {edit && Send()}
                <h1>contact me </h1>
                <input ref={inputref}></input>
                <button onClick={() => {

                    setEdit(true)
                    Send()
                }}>Contact</button>
            </div>
        </>

    )
}
export default Contact