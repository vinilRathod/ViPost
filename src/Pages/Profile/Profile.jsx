import React, { useEffect,useState } from 'react';
import './Profile.css';
import {Image} from 'cloudinary-react';
import Navbar from '../../components/Navbar';
import Axios from 'axios';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import {WhatsappIcon,FacebookIcon,TwitterIcon, FacebookShareButton, WhatsappShareButton, TwitterShareButton} from 'react-share';
const Profile = () => {
    const [yourPosts,setYourPosts]= useState([]);
    useEffect(()=>{
        Axios.get(`https://vi-post.herokuapp.com/post/byUser/${localStorage.getItem("username")}`
            
        ).then(response =>{
            setYourPosts(response.data);
        })
    },[]);
    return(
    <>
    <Navbar loginfo={localStorage.getItem("loggedin")} />
    <div className="Profile">
                <h1>{localStorage.getItem("username")} 's Posts </h1>
                {yourPosts.map((val,key) =>{
                        return(
                            <div className="Upload" key={val.id}>
                                <div className="Image">
                                    <Image cloudName="dzxpy9npp" publicId={val.image} />
                                </div>
                                <div className="Caption">
                                      <div className="Title">
                                       {val.title}
                                     </div>
                                     <div className="UserDetails">
                                        by @{val.username}
                                   </div>
                                    Likes : {val.likes} <br />
                                    Posted on {val.day}-{val.month}-{val.year}
                                    <div className="Share">
                                       <FacebookShareButton
                                        url={String(window.location)}
                                        style={{width:"30px"}}
                                       >
                                           <FacebookIcon  size={30} />
                                       </FacebookShareButton>
                                       <WhatsappShareButton  
                                       url={String(window.location)}
                                       style={{width:"30px"}}
                                       >
                                           <WhatsappIcon size={30} />
                                       </WhatsappShareButton>
                                       <TwitterShareButton
                                       url={String(window.location)}
                                       style={{width:"30px"}}
                                       >
                                           <TwitterIcon size={30} />
                                       </TwitterShareButton>
                                        
                                    </div>
                                </div>
                            </div>
                        )
                    })}
    </div>
    </>
    );
}
export default Profile;