import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Fetched = () => {



    const [myPost, setMyPost] = useState([])
    const [post, setPost] = useState([])
    const [edit, setEdit] = useState(false)
    const [img, setImg] = useState([])

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [id, setId] = useState()
    useEffect(() => {
        GetPost()
    }, [post])

    const GetPost = async () => {


        const response = await axios.get('http://localhost:5000/GetMyPost')
        console.log(response)
        setMyPost(response.data.post)
        setImg(response.data.base)
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
            <div className="EditBox">
                <div className="field">

                    <form className="box" onSubmit={Register}>
                        <label className="label">Title : </label>
                        <input className="input is-rounded is-success" type="text" value={title} onChange={(e) => setTitle(e.target.value)}>
                        </input>
                        <label className="label">Content : </label>
                        <input className="input is-rounded is-success" type="text" value={content} onChange={(e) => setContent(e.target.value)}>
                        </input>
                        <button className="button is-rounded is-primary" type="submit">Submit</button>
                    </form>

                </div>
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

                {edit && Edited()}
                <table className="table is-striped">
                    <thead className="thead " >
                        <tr>
                            <th>No</th>
                            <th>Title</th>
                            <th>Content</th>
                        </tr>
                    </thead>
                    <tbody className="tbody">
                        {myPost.map((pst, i) => {
                            return (
                                <tr key={pst.id}>
                                    <td>{i + 1} </td>
                                    <td>  <Link to={`Post/${pst.id}`}>{pst.title}</Link></td>

                                    <td><img src={`data:image/jpg;base64,${img[i]}`} width="80" height={80} /></td>
                                    <td><button className="button is-warning is-rounded" onClick={() => {
                                        setEdit(true)
                                        HandleEdit(i)
                                    }}>Edit</button></td>
                                    <td><button className="button is-danger is-rounded" onClick={() => handleDelete(i)}>Delete</button></td>

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