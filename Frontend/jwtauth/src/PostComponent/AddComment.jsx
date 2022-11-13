import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useParams, Outlet, useNavigate } from 'react-router-dom'

const AddComment = () => {

    const [comment, setComment] = useState([])
    const [FetchedCM, setFetchedCM] = useState([])
    const [Clicked, SetIsClicked] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        ShowCommant(id)
    }, [Clicked])
    const FetchComment = async () => {


        await axios.post(`http://localhost:5000/Post/${id}`, { comment: comment })
            .then((res) => {
                console.log(res)
            })

        SetIsClicked(!Clicked)
        navigate("/")
    }
    const ShowCommant = async () => {
        try {

            await axios.get(`http://localhost:5000/Post/${id}`)
                .then((res) => {
                    console.log(res.data)
                    setFetchedCM(res.data.comment[0])
                })

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="field">
                <textarea className="textarea  is-success" name="content" type="text" placeholder="Post Comment" onChange={(e) => { setComment(e.target.value) }} />
                <button className="button is-info is-rounded" onClick={FetchComment}>Send</button>
            </div>


            <div className="field">
                {FetchedCM && FetchedCM.map((com, i) => {
                    return (
                        <div className="dialogbox" key={i}>
                            <div className="body">
                                <span className="tip tip-up"></span>
                                <div className="message">
                                    <span> {com.content}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>


        </>
    )

}
export default AddComment