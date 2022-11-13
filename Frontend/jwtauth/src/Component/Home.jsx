import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from 'react-router-dom'
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Home = () => {

    const [posts, setPosts] = useState([])
    const [limit, setLimit] = useState(4)
    const [skip, setSkip] = useState(0)
    const [pic, setPic] = useState([])
    const [serachvalue, setserachValue] = useState('')
    const [list, setList] = useState([])


    const [curpage, setCurpage] = useState(1)
    const [total, setTotal] = useState()

    const nextPage = () => {
        if (curpage.next) { setSkip(skip + limit) }

    }

    const previousPage = () => {
        if (curpage.previous) { setSkip(skip - limit) }

    }
    useEffect(() => {
        Handle(limit, skip)
        if (serachvalue) {
            Search()
        }

    }, [limit, skip])
    const Handle = async (limit, skip) => {

        const response = await axios.get(`http://localhost:5000/posts/?limit=${limit}&skip=${skip}`)

        console.log(response.data)
        setPosts(response.data.data.data)
        setCurpage(response.data.data)
        setTotal(response.data.data.totalPost)
        setPic(response.data.pic)
        setList(response.data.data.data)
    }

    const Search = () => {
      
        const data = posts.filter((post) => {

            if (serachvalue === "") {
                return post

            }
            else {
                return post.title.toLowerCase().includes(serachvalue)
            }

        })

        setList(data)

    }
    return (
        <>
            <section className="section">
                <div className="Posts">
                    <div>

                        <input className="input is-rounded is-info" type="text" placeholder="Search On Post Title" onChange={(e) => { setserachValue(e.target.value) }} />
                        <br />
                        <button className="button is-rounded is-info" type="submit" onClick={Search} >Search</button>
                        <br />
                        <br />

                        <h1>All Post</h1>
                        <h2>Total Post : {total}</h2>
                        {list.map((post, i) => {
                            return (

                                <div className="card" key={i}>
                                    <Link to={`/Post/${post.id}`}><img src={`data:image/jpg;base64,${pic[i]}`} width={100} height={100} /></Link>

                                    <div className="container">
                                        <h4><b> <Link to={`/Post/${post.id}`}>{post.title}</Link></b></h4>
                                        <p>{post.content}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
            <div className="Pagi">
                <div className="field">
                    <button className="button is-info is-small" onClick={previousPage}>Previous Page</button>&nbsp;&nbsp;&nbsp;
                    <button className="button is-info is-small" onClick={nextPage}>Next Page</button>
                </div>
            </div>
        </>
    )
}
export default Home