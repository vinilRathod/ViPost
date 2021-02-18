import React from 'react';
import './Navbar.css';
const Navbar = (props) =>{
    
    return(
        <>
        
        <div className="Navbar">
            <div>
            <img src="./Vi-icon.jpeg" width="70px" height="70px"  style={{marginRight:"1590px"}}/>
            </div>
        
                <a href="/">Home</a>
                 { 
                 
                props.loginfo ?
                (
                    <>
                    <a href="/post">Post</a>
                    <a href="/profile">Profile</a>
                    <a href="/logout">Logout</a>
                    </>
                )
                :
                (
                    <>
                    <a href="/register">Register</a>
                    <a href="/login">Login</a>
                    </>
                )  
                
            }
            
        </div>
        </>
    );
}
export default Navbar;