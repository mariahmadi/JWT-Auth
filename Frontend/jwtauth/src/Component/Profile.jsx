import React, { useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useEffect } from "react";

const Uploaded = () => {
    const [upload, setUpload] = useState()
    const [image, setImage] = useState('')
    const [edit, setEdit] = useState(false)
    const [name, setName] = useState('')
    useEffect(() => {
        AccessUser()
    }, [name])
    const handleChange = (e) => {
        setUpload(e.target.file)


    }

    const AccessUser = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token')
            console.log(response)
            setToken(response.data.AccesToken)
            const decoded = jwtDecode(response.data.AccesToken)
            console.log("decoded" + decoded)
            setName(decoded.name)
        } catch (error) {
            console.log(error)
        }

    }
    const Submit = () => {

        const register = () => {
            axios.put('http://localhost:5000/ChangeInfo', { name: name })
        }
        return (
            <div>
                <form onSubmit={register}>
                    <label>Your Username</label>
                    <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} ></input>
                    <button type="submit">Submit</button>
                </form>
            </div>)
    }
    const UploadImage = () => {
        const config = {
            headers: {
                'Accept': 'application/json text/html', "Content_type": 'application/json'
            }
        }
        try {
            axios.get('http://localhost:5000/GetIMG', config)
                .then((res) => {
                    console.log(res)
                    setImage(res.data)
                    console.log("Image Uploaded")
                })


        } catch (error) {
            console.log(error)
        }
    }
    const handlePost = () => {


        const formDate = new FormData()
        formDate.append("Image", upload)
        try {
            axios.post('http://localhost:5000/upload', formDate)
                .then(() => {

                    console.log("File Sent SuccessFully")
                })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <h1>Wellcome Back : {name}</h1>
            <img src={image.data} alt="" />
            <div>
                <form onSubmit={handlePost}>
                    <label>Profole Picture : </label>
                    <input type="file" accept="image/jpeg,image/jpg,image/png" onChange={handleChange} ></input>
                    <button type="submit">Save Change</button>
                </form>
            </div>

            <button onClick={UploadImage}>Get Image</button>
            <button onClick={() => {
                setEdit(true)

            }}>Change Name</button>
            {edit && Submit()}
        </>
    )
}
export default Uploaded