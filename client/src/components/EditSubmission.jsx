import React from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'


const EditSubmission = () => {

    const {id} = useParams()
    const navigate = useNavigate()

    const [design, setDesign] = useState({
        name: '',
        image: '',
        commentary: ''
    })
    console.log(id)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/designs/${id}`)
        .then(res => {
            console.log(res)
            setDesign(res.data.design)
            console.log(Array.isArray(res.data.designs)) 
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    // const [error, setError] = useState({})

    const handleChange = (e) => {
        const {name, value} = e.target;
        if(e.target.name === 'image') {
            const image = e.target.files[0];
            setDesign({...design, [name]: image})
        }else{
            setDesign({...design, [name]: value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData()
        axios.put(`http://localhost:8000/api/designs/${id}`, formData, {withCredentials: true})
            .then(res => {
                console.log(res)
                navigate("/main")
            })
            .catch(err => {
                console.log(err)
                
            })
    }

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/designs/${id}`)
        .then(res => {
            console.log("success deleting design");
            console.log(res)
            navigate("/main")
        })
        .catch(err => {
            console.log("error deleting design", err.response);
        })
    }

    return (
        <div>
            <h2 style={{fontFamily: 'copperplate'}}>Edit Submission:</h2>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <div>
                    <label htmlFor="">Name: </label>
                    <input 
                    type="text"
                    className="form-control" 
                    name="name" 
                    value={design.name} 
                    onChange={handleChange} />
                    {/* {
                        error.name ? <p>{error.name.message}</p> : null
                    } */}
                </div>
                <div>
                    <label htmlFor="">Design: </label>
                    <input 
                    type="file"
                    className="form-control" 
                    name="image" 
                    value={design.image} 
                    onChange={handleChange} />
                    {/* {
                        error.image ? <p>{error.image.message}</p> : null
                    } */}
                </div>
                <div>
                    <label htmlFor="">Add Commentary: </label>
                    <textarea 
                    name="commentary"
                    className="form-control" 
                    cols="30" 
                    rows="10" 
                    value={design.commentary} 
                    onChange={handleChange} />
                    {/* {
                        error.commentary ? <p>{error.commentary.message}</p> : null
                    } */}
                </div>
                <button>Submit</button>
                <button onClick={(e) => handleDelete(design._id)}>Delete</button>
            </form>
        </div>
    )
}

export default EditSubmission