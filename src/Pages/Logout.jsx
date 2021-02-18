import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
const Logout = () =>{
   useEffect(()=>{
        localStorage.removeItem("loggedin");
        localStorage.removeItem("username")
   },[])
   const history=useHistory();
   history.push('/');
   return(
       null
   );
}
export default Logout;