import React, { useState } from 'react';
import './Post.css';
import Axios from 'axios';
import {useHistory} from 'react-router-dom';
import Navbar from '../../components/Navbar';
const Post = () => {
    const [title,setTitle] = useState('');
    const [image,setImage] = useState([]);
    let history = useHistory();
    const post = () =>{
        const formData = new FormData();
        formData.append("file",image[0]);
        formData.append("upload_preset","ei1wpalh");
        Axios.post("https://api.cloudinary.com/v1_1/dzxpy9npp/image/upload",formData).then(response =>{
                const imgName = response.data.public_id;
                Axios.post("https://vi-post.herokuapp.com/post",{
                    title:title,
                    image:imgName,
                    username:localStorage.getItem("username")
                }).then(()=>{
                        history.push('/');
                });
        });
}
    return(
        <>
        <Navbar loginfo={localStorage.getItem("loggedin")} />
        <div className="Post">
                <h1>Create a Post</h1>
                <div className="PostForm">
                    <input type="text" placeholder="Caption" onChange={event => {setTitle(event.target.value)}} />
                    <input type="file"  onChange={e=>{setImage(e.target.files)}} />
                    <button onClick={post}>Post</button>
                </div>
        </div>
        </>
    );
}
export default Post;