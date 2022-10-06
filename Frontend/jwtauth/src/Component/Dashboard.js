import react, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'


const Dashboard = () => {


    const [name, setName] = useState('')
    const [expire, setExpire] = useState('')
    const [msg, setMsg] = useState('')
    const [token, setToken] = useState('')
    const [users, setUsers] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        access();
        getUser();

    }, [])
    const access = async () => {

        try {
            const response = await axios.get('http://localhost:5000/token')
            console.log(response)
            setToken(response.data.AccesToken)
            const decoded = jwt_decode(response.data.AccesToken)
            console.log("decoded" + decoded)
            setName(decoded.name)
            setExpire(decoded.exp)

        } catch (error) {
            if (error.response) {
                setMsg(error.response.data)
                navigate("/")
            }
        }

    }

    const AxiosJwt = axios.create()

    AxiosJwt.interceptors.request.use(async (config) => {
        const currentDate = new Date()
        if (expire * 1000 < currentDate.getDate()) {

            const response = await axios.get('http://localhost:5000/token')
            console.log("second axios" + response)
            config.headers.Authorization = `Bearer ${response.data.AccesToken}`
            setToken(response.data.AccesToken)
            const decoded = jwt_decode(response.data.AccesToken)
            setName(decoded.name)
            setExpire(decoded.exp)
        }
        return config
    }
        , (Error) => {
            console.log("erooor is " + Error)
            return Promise.reject(Error)

        })
    const getUser = async () => {

        const response = await AxiosJwt.get('http://localhost:5000/GetUsers', {
            headers:
                { Authorization: `Bearer ${token}` }

        })
        console.log(response)
        setUsers(response.data)
    }

    return (
     
        <div>
            <h1>Welcome Back: {name}</h1>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, i) => {
                        return (
                            <tr key={user.id}>
                                <td>{i + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )





}
export default Dashboard
