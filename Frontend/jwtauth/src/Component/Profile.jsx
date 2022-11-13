import React, { useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useEffect } from "react";

const Uploaded = () => {

    const [image, setImage] = useState('')
    const [Profile, setProfile] = useState([])
    const [Profile1, setProfile1] = useState([])


    const [edit, setEdit] = useState(false)
    const [name, setName] = useState('')

    useEffect(() => {
        GetName()
        UploadImage()
    }, [Profile1])
    const GetName = async () => {

        try {
            const response = await axios.get('http://localhost:5000/token')
            const decoded = jwtDecode(response.data.AccesToken)
            setName(decoded.name)

        } catch (error) {
            if (error.response) {
                setMsg(error.response.data)
                navigate("/")
            }
        }

    }


    const Submit = () => {

        const register = () => {
            axios.put('http://localhost:5000/ChangeInfo', { name: name })
        }
        return (
            <div>
                <form className="box" onSubmit={register}>
                    <label className="label">Your Username</label>
                    <input className="input is-rounded is-primary" type="text" value={name} onChange={(e) => { setName(e.target.value) }} ></input>
                    <button className="button is-rounded is-primary" type="submit">Submit</button>
                </form>
            </div>)
    }

    const UploadImage = async () => {


        try {
            await axios.get('http://localhost:5000/GetIMG',)
                .then((res) => {


                    setProfile1(res.data)
                })




        } catch (error) {
            console.log("get image log" + error)
        }
    }
    const handleChange = (e) => {
        setImage(e.target.files[0])
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('Image', image)

        try {
            await axios.post('http://localhost:5000/upload', formdata)
                .then((res) => {

                    setProfile1(res.data)
                })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div className="Profile">
                <div className="field">
                    <figure className="image is-64x64">
                        <img className="is-rounded" src={`data:image/png;base64,${Profile1}`} width="30" height={50} />
                    </figure >

                </div>
                <h1>Welcome :  {name}</h1>
                <div className="imageBox">

                </div>
                <div>
                    <form className="box" onSubmit={handleSubmit} encType="multipart/form-data" >
                        <label className="label">Profole Picture : </label>
                        <input className="input is-rounded is-primary" type="file" name="Image" accept="image/jpeg,image/jpg,image/png" onChange={handleChange} />
                        <br />
                        <br />
                        <button className="button is-rounded is-link" type="submit" >Send </button>
                    </form>
                </div>
                <button className="button is-rounded is-primary" onClick={() => {
                    setEdit(true)

                }}>Change Name</button>
                {edit && Submit()}
            </div>

        </>
    )
}
export default Uploaded