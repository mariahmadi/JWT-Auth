import React, { useState } from "react";
import axios from "axios";
import { Link, useParams, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { FaHeart } from 'react-icons/fa'
import { useLayoutEffect } from "react";

const HomePost = () => {

    const [post, setPost] = useState([])
    const [pic, setPic] = useState([])
    const [likes, setLikes] = useState(0)
    const [isClicked, SetIsClicked] = useState(false)


    const { id } = useParams()
    useEffect(() => {
        GetPost(id)

    }, [])


    const GetPost = async () => {
        try {
            await axios.get(`http://localhost:5000/Post/${id}`)
                .then((response) => {
                    console.log(response.data)
                    setPost(response.data.post)
                    setPic(response.data.pic)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const Like = async () => {

        if (isClicked) {
            setLikes(likes - 1)
        }
        else {
            setLikes(likes + 1)
        }
        SetIsClicked(!isClicked)

        console.log("first" + likes)


        Submit(id)



    }
    const Submit = async () => {
        try {
            await axios.post(`http://localhost:5000/LikePost/${id}`, { like: likes })
                .then((res) => {
                    console.log(res)
                })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="Postid">
                <Link to="/">Go Back</Link>

                <article>
                    <img src={`data:image/jpeg;base64,${pic}`} width={80} height={80} />

                    <h2><b>{post.title}</b></h2>
                    <p>{post.content}</p>
                    <button className="button is-primary" onClick={Like} > <span ><FaHeart style={{ color: "red" }} /> {`${likes}`}</span></button>
                </article>
                <div>
                    <Outlet />

                </div>

            </div>





        </>
    )
}
export default HomePost