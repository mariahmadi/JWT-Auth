import react, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'



const AddPost = () => {
   
    const [userId, setUserId] = useState(null)
    const Schema = yup.object().shape({
        title: yup.string().required(),
        content: yup.string().required()

    })

    const { handleSubmit, reset, register, formState: { errors } } = useForm({ resolver: yupResolver(Schema) })

    const onSubmit = data => {
        try {
            console.log(data)
            axios.post('http://localhost:5000/addPost', data)
            reset()
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit, onerror)}>
                <div>
                    <label>Title</label>
                    <input name='title' {...register('title', { required: true })}></input>
                    {errors?.title && errors.title.message}

                </div>
                <div>

                    <label>Content</label>
                    <input name='content' type="text" {...register('content', { required: true })}></input>
                    {errors?.content && errors.content.message}

                </div>
                <button type='submit' >Add Post</button>
            </form>
        </div>

    )

}
export default AddPost