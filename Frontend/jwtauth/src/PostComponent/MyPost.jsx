import React, { useState, useEffect } from "react";
import axios from "axios";

const Fetched = () => {



    const [myPost, setMyPost] = useState([])
    const [post, setPost] = useState([])
    const [edit, setEdit] = useState(false)

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [id, setId] = useState()
    useEffect(() => {
        GetPost()
    }, [post])

    const GetPost = async () => {


        const response = await axios.get('http://localhost:5000/post')

        setMyPost(response.data)

    }
    const HandleEdit = (i) => {


        console.log(myPost[i])
        setPost(myPost[i])

        setTitle(myPost[i].title)
        setContent(myPost[i].content)
        setId(myPost[i].id)

    }
    const Edited = () => {


        const Register = (e) => {
            e.preventDefault()
            axios.put('http://localhost:5000/Update', {
                title: title,
                content: content,
                id: id
            })
            setEdit(false)
            setPost([])

        }
        return (
            <div>

                <form onSubmit={Register}>
                    <label>Title : </label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}>
                    </input>
                    <label>Content : </label>
                    <input type="text" value={content} onChange={(e) => setContent(e.target.value)}>
                    </input>
                    <button type="submit">Submit</button>
                </form>

            </div>)




    }
    const handleDelete = (i) => {
        const DeletedID = myPost[i].id
        let p = []
        const post = myPost.filter((post) => {
            if (post.id !== DeletedID)
                return p.push(post)
        })
        setPost(post)
        var answer = window.confirm("Are You Sure?");
        try {
            if (answer)
                axios.delete('http://localhost:5000/deletePost', {

                    data: {
                        id: DeletedID
                    }
                });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>

            <div>
                <h1>My Post</h1>
                {edit && Edited()}
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Title</th>
                            <th>Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myPost.map((pst, i) => {
                            return (
                                <tr key={pst.id}>
                                    <td>{i + 1}</td>
                                    <td>{pst.title}</td>
                                    <td>{pst.content}</td>
                                    <td><button onClick={() => {
                                        setEdit(true)
                                        HandleEdit(i)
                                    }}>Edit</button></td>
                                    <td><button onClick={() => handleDelete(i)}>Delete</button></td>

                                </tr>
                            )
                        })}

                    </tbody>
                </table>




            </div>
        </>
    )




}
export default Fetched