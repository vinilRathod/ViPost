import React ,{useState} from 'react';
import Axios from 'axios';
import './Login.css';
import {useHistory} from 'react-router-dom';
import Navbar from '../../components/Navbar';
const Login = () =>{
    const [username,setUsername] =useState('');
    const [password,setPassword] =useState('');
    const [errorMsg,setError] = useState('');
    const history = useHistory();
    const login = () => {
        Axios.post("http://localhost:3001/user/login",{
            username:username,
            password:password,
        }).then(response =>{
            if(response.data.loggedin){
                
                localStorage.setItem("loggedin",true);
                localStorage.setItem("username",response.data.username);
                history.push('/');
            }else{
                setError(response.data.message);
            }
        });
    };
    return(
        <>
        <Navbar loginfo={localStorage.getItem("loggedin")} />
        <div className="Login">
                 <h1>Login</h1>
                <div className="LoginForm">
                    <input type="text" placeholder="Enter your usernname !" onChange={event =>{setUsername(event.target.value)}} />
                    <input type="password" placeholder="Enter your password !" onChange={event =>{setPassword(event.target.value)}}  />
                    <button onClick={login}>Login</button>
                </div>
                <h1 style={{color: "red"}}> {errorMsg} </h1>
        </div>
        </>
    );
}
export default Login;