import React,{useState} from 'react';
import Axios from 'axios';
import Navbar from '../../components/Navbar';
import './Register.css';
const Register = () =>{
    const [username,setUsername] =useState('');
    const [password,setPassword] =useState('');
    const [msg,setMsg] =useState('');
    const register = () => {
        Axios.post("http://vi-post.herokuapp.com/register",{
            username:username,
            password:password
        }).then(response =>{
            setMsg(response.data.msg);
        });
    };
    return(
        <>
        <Navbar loginfo={localStorage.getItem("loggedin")} />
        <div className="Register">
                <h1>Registration</h1>
                <div className="RegisterForm">
                    <input type="text" placeholder="Create your usernname !" onChange={event =>{setUsername(event.target.value)}} />
                    <input type="password" placeholder="Create your password !" onChange={event =>{setPassword(event.target.value)}} />
                    <button onClick={register}>Register</button>
                    <h1 style={{color: "red"}}> {msg} </h1>
                </div>
        </div>
        </>
    );
}
export default Register;