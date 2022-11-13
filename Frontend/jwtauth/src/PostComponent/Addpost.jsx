import react, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const AddPost = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const [pic, setPic] = useState('')
    const navigate = useNavigate()

    const Submitted = async (e) => {
        e.preventDefault()
        try {


            const formData = new FormData()
            formData.append("Image", pic)
            formData.append("title", title)
            formData.append("content", content)
            console.log(formData)

            await axios.post("http://localhost:5000/addPost", formData)
                .then((res) => {
                    console.log(res)
                    navigate("/")
                })
        } catch (error) {
            console.log(error)
        }


    }
    return (

        <section className="section">
            <form onSubmit={Submitted} name="myform" encType="multipart/form-data">
                <div className='AddPost'>
                    <div className="field">
                        <label className="label">Content</label>
                        <input className="input is-rounded is-primary" type="text" name='title' required onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="field">

                        <label className="label">Content</label>
                        <input className="input is-success is-rounded" placeholder="" type="text" name='content' required onChange={(e) => setContent(e.target.value)} ></input>

                    </div>
                    <div className="file">
                        <label className="file-label">
                            <input className="file-input" type="file" accept='Image/*' name='Image' onChange={(e) => setPic(e.target.files[0])} />
                            <span className="file-cta">
                                Choose a file…
                            </span>
                        </label>
                    </div>
                    <br />
                    <button className="button is-primary is-rounded" type='submit'>Add Post</button>

                </div >
            </form >

        </section >

    )




}

export default AddPost