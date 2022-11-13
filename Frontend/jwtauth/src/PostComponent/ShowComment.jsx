import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useOutletContext } from 'react-router-dom'

const ShowComment = () => {

    const [comment, setComment] = useState([])
    const { id } = useParams()

    console.log(id)
    useEffect(() => {
        FetchComment(id)
    }, [])
    const FetchComment = async () => {
        try {

            await axios.get(`http://localhost:5000/CommentShow/${id}`)
                .then((res) => {
                    console.log(res.data)
                    // setComment(res.data.comment[0])
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="field">
            {comment && comment.map((com, i) => {
                return (
                    <div className="dialogbox">
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
    )

}
export default ShowComment