import React,{useState} from 'react';
import Axios from 'axios';
import Navbar from '../../components/Navbar';
import './Register.css';
const Register = () =>{
    const [username,setUsername] =useState('');
    const [password,setPassword] =useState('');
    const [mob,setMob]=useState('');
    const [mail,setMail] =useState('');
    const [msg,setMsg] =useState('');
    const register = () => {
        Axios.post("https://vi-post.herokuapp.com/user/register",{
            username:username,
            password:password,
            mob:mob,
            mail:mail
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
                    <input type="email" placeholder="Enter your mail !" onChange={event =>{setMail(event.target.value)}} />
                    <input type="number" placeholder="Enter your Whatsapp mobile !" onChange={event =>{setMob(event.target.value)}} />
                    <input type="password" placeholder="Create your password !" onChange={event =>{setPassword(event.target.value)}} />
                    <button onClick={register}>Register</button>
                    <h1 style={{color: "red"}}> {msg} </h1>
                </div>
        </div>
        </>
    );
}
export default Register;