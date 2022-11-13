import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from 'react-router-dom'
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Home = () => {

    const [posts, setPosts] = useState([])
    const [limit, setLimit] = useState(4)
    const [skip, setSkip] = useState(0)
    const [pic, setPic] = useState([])
    const [fetch, setIsfetch] = useState(false)


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

    }, [limit, skip])
    const Handle = async (limit, skip) => {

        const response = await axios.get(`http://localhost:5000/posts/?limit=${limit}&skip=${skip}`)

        console.log(response.data)
        setPosts(response.data.data.data)
        setCurpage(response.data.data)
        setTotal(response.data.data.totalPost)
        setPic(response.data.pic)

    }

    // <table className="table">
    //                 <thead>
    //                     <tr>
    //                         <th><abbr title="Position">NO</abbr></th>
    //                         <th>Title</th>
    //                         <th>Content</th>

    //                     </tr>
    //                 </thead>
    //                 <tbody>

    //                     {posts.map((post, i) => {
    //                         return (
    //                             <tr key={post.id}>
    //                                 <td>{i + 1}</td>
    //                                 <td><Link to={`/Post/${post.id}`}>{post.title}</Link></td>
    //                                 <td>{post.content}</td>
    //                                 <td><Link to={`/Post/${post.id}`}>Comment</Link></td>
    //                                 <td><Link to={`/Post/${post.id}`}><img src={`data:image/jpg;base64,${pic[i]}`} width={90} height={90} /></Link></td>

    //                             </tr>
    //                         )
    //                     })}
    //                 </tbody>


    //             </table>
    //     <article key={i}>
    //     <h2>{post.id}</h2>
    //     <Link to={`/Post/${post.id}`}><img src={`data:image/jpg;base64,${pic[i]}`} width={100} height={100} /></Link>

    //     <p>{i + 1}</p>
    //     <Link to={`/Post/${post.id}`}>{post.title}</Link>
    //     <h2>{post.content}</h2>
    //     <Link to={`/Post/${post.id}`}>Comment</Link>
    // </article>
    return (
        <>
            <section className="section">
                <div className="Posts">
                    <div>
                        <h1>All Post</h1>
                        <h2>Total Post : {total}</h2>

                        {posts.map((post, i) => {
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