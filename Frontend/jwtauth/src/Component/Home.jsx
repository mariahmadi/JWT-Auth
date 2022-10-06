import axios from "axios";
import React, { useState, useEffect } from "react";


const Home =  () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        Handle()

    }, [])
    const Handle = async () => {

        const response = await axios.get('http://localhost:5000/posts')
     
        setPosts(response.data)

    }
    return (

        <div>
            <h1>All Post</h1>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Content</th>

                    </tr>
                </thead>
                <tbody>
               {posts.map((post,i)=>{
                return(
                    <tr key={post.id}>
                        <td>{i +1 }</td>
                        <td>{post.title}</td>
                        <td>{post.content}</td>

                    </tr>
                )
               })}

                </tbody>
            </table>
            <button onClick={Handle}>Refresh</button>
        </div>
    )
}
export default Home