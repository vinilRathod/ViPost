import React, { useEffect, useState } from 'react';
import {Image} from 'cloudinary-react';
import Axios from 'axios';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Navbar from '../../components/Navbar';
import {WhatsappIcon,FacebookIcon,TwitterIcon, FacebookShareButton, WhatsappShareButton, TwitterShareButton} from 'react-share';
import './Home.css';
import { useHistory } from 'react-router-dom';
const Home = () =>{
    useEffect(()=>{
        if(localStorage.getItem("username")){
        Axios.get(`https://vi-post.herokuapp.com/user/likes/${localStorage.getItem("username")}`).then(response=>{
                    var tmpArray=[];
                    response.data.map((val)=>{
                        tmpArray[val.postid]=true;
                    })
                    localStorage.setItem("liked",JSON.stringify(tmpArray));
                })
            }
    },[])
    const [posts,setPost] = useState([]);
    const [likes,setLikes] = useState([]);
    const [liked,setLiked] =useState(JSON.parse(localStorage.getItem("liked")));
    localStorage.setItem("liked",JSON.stringify(liked));
    const history=useHistory();
    const [mob,setMob]=useState([]);
    const [mail,setMail]=useState([]);
    useEffect(()=>{
            
            Axios.get("https://vi-post.herokuapp.com/post").then(response=>{
                setPost(response.data);
                var tmpArr=[];
                response.data.map(val => {
                    tmpArr.push(val.likes);
                })
                setLikes(tmpArr);
                response.data.map(val=>{
                    
                    Axios.get(`https://vi-post.herokuapp.com/user/${val.username}`).then(response=>{
                       setMail([...mail,response.data[0].mail]);
                       setMob([...mob,response.data[0].mob]);           
        })
        
                })
            });
    },[]);
    const likePost = (id) =>{
        Axios.post("https://vi-post.herokuapp.com/post/like",{
            userLiking:localStorage.getItem("username"),
            postid:id
        }).then(response =>{
                
                history.push('/');
        })
    }
    return(
        <>
        <Navbar loginfo={localStorage.getItem("loggedin")} />
        {
        localStorage.getItem("loggedin") ?
        (
        <div className="Home">
                
                    {posts.map((val,key) =>{
                        return(
                            <div className="Upload">
                                <div className="Image">
                                    <Image cloudName="dzxpy9npp" publicId={val.image} />
                                </div>
                                <div className="Caption">
                                      <div className="Title">
                                       {val.title}
                                     </div>
                                     <div className="UserDetails">
                                        by @{val.username}<br />
                                        
                                        Price : Rs. {val.price}
                                   </div>
                                   
                                   <div className="Likes">
                                    {
                                        
                                        !JSON.parse(localStorage.getItem("liked"))[val.id] ?
                                        (
                                        <ThumbUpAltIcon id="likeButton" onClick={() =>{ 
                                            likePost(val.id);
                                            let tmpLikes =likes;
                                            tmpLikes[val.id] = tmpLikes[val.id] +1;
                                            setLikes(tmpLikes);
                                            document.getElementById("likes").innerHTML=tmpLikes[key];
                                            let tmpLiked=liked;
                                            tmpLiked[val.id]=true;
                                            setLiked(tmpLiked);
                                            localStorage.setItem("liked",JSON.stringify(liked))
                                           }
                                           
                                        } />
                                        ):
                                        (
                                            <ThumbUpAltIcon style={{color:"black",fontSize:"40px"}}/>
                                        )
                                    }
                                   
                                    <div id="likes">
                                    {likes[val.id]}
                                    
                                    <div id="info">
                                        Mobile Number : {mob[key]}
                                        <br />
                                        Mail id : {mail[key]}
                                    </div>
                                   </div> 
                                   
                                   </div>
                                   
                                   <div className="Share">
                                   Posted on {val.day}-{val.month}-{val.year}
                                       <FacebookShareButton
                                        url={String(window.location)}
                                        style={{width:"30px",paddingLeft:"100px"}}
                                       >
                                           <FacebookIcon  size={30} />
                                       </FacebookShareButton>
                                       <WhatsappShareButton  
                                       url={String(window.location)}
                                       style={{width:"30px",paddingLeft:"20px"}}
                                       >
                                           <WhatsappIcon size={30} />
                                       </WhatsappShareButton>
                                       <TwitterShareButton
                                       url={String(window.location)}
                                       style={{width:"30px",paddingLeft:"10px"}}
                                       >
                                           <TwitterIcon size={30} />
                                       </TwitterShareButton>
                                        
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                        
                
        </div>)
        
        
        :
        (
            <div>
               <h1 style={{color:"blue",textAlign:"center"}}> Login/Register to See the Content !</h1>
            </div>
        )
                }
        </>
    );
                
}
export default Home;