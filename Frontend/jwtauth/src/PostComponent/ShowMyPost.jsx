import React, { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

const ShowPost = () => {

    const [post, setPost] = useState([])
    const [pic, setPic] = useState([])


    const { id } = useParams()
    useEffect(() => {
        GetPost(id)
    }, [])

    console.log(id)
    const GetPost = async () => {
        try {
            await axios.get(`http://localhost:5000/Post/${id}`)
                .then((response) => {
                    console.log(response.data)
                    setPost(response.data.post)
                    setPic(response.data.pic)
                })
        } catch (error) {

        }
    }

    return (
        <>
            <div className="field">
                <article>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <img src={`data:image/jpeg;base64,${pic}`} width={80} height={80} />
                </article>
            </div>
            <Link to="/MyPost">Go Back</Link>
        </>
    )
}
export default ShowPost