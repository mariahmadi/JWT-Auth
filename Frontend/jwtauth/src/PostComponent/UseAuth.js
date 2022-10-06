import react, { useState, useContext, useEffect, createContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import useLocaleStorage from './LocaleStorage'

const AuthContext = createContext()

export const useAuth = () => {

    const [authed, setAuthed] = useLocaleStorage('user', false)
    const navigate = useNavigate()



    return {


        authed,
        login() {
             return new Promise((res) => {

            setAuthed(true)

              res()


             })
        }
        , logout() {
            return new Promise((res) => {

                setAuthed(false)
                console.log("logout")
                navigate("/")
                res()

            })
        }
    }
}



export const authProvider = ({ children }) => {
    const auth = useAuth()

    return <AuthContext.Provider value={auth}>{children} </AuthContext.Provider>

}

const authConsumer = () => {
    return useContext(AuthContext)
}
export default authConsumer 