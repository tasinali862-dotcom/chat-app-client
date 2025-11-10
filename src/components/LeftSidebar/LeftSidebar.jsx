import React, { useContext, useEffect, useState } from 'react'
import './LeftSidebar.css'
import assets from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import { ChatContext } from '../../../context/ChatContext'
const LeftSidebar = () => {



  const {users,selectedUser,getUsers,setSelectUser, unseenMessage,setUnseenMessage} = useContext(ChatContext)
  const {logout,onlineUsers} = useContext(AuthContext);
   
  const [input,setInput] = useState("");
  const navigate = useNavigate();
  
  const filteredUsers = input ? users.filter((user)=>user.fullName.toLowerCase().
  includes(input.toLowerCase())) : users;

  useEffect(()=>{
    getUsers();
  },[onlineUsers])

  return (
    <div className='ls'>
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} className='logo' alt="" />
          <div className="menu">
            <img src={assets.menu_icon} alt="" />
            <div className='sub-menu'>
              <p onClick={()=>navigate("/profile")}>Edit Profile</p>
              <hr />
              <p onClick={()=>logout()}>Logout</p>
            </div>           
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon} alt="" />
          <input onChange={(e)=>setInput(e.target.value)}  type="text" placeholder='Search here...' />
        </div>
      </div>

      <div className="ls-list">
        {filteredUsers.map((item,index)=>(
          <div onClick={()=>{setSelectUser(item); setUnseenMessage((prev)=>({...prev,[item._id]:0})) }} key={index} className="friends">
            {/* <img src={assets.profile_img} alt="" /> */}
            <img src={item.profilePic ? item.profilePic  : assets.profile_img} alt="" />
            <div>
              {/* <p>siam ali</p> */}
              <p>{item.fullName}</p>
              
              {/* new add */}
              {
                  onlineUsers.includes(item._id)
                  ?<span className='text-green-400 text-xs'>Online</span>
                  :<span className='text-neutral-400 text-xs'>Ofline</span>
              }

            </div>
            {/* unsin messages */}
            <div>
              {unseenMessage[item._id] > 0?<p>{unseenMessage[item._id]}</p>:null} 
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeftSidebar
