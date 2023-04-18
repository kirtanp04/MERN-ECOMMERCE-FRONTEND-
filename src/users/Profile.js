import React, { useContext, useEffect, useState } from 'react'
import { userLink } from '../mainLink'
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import { Context } from './Context/Context'
const Profile = () => {
  const[user,setUser] = useState("")
  const navigate = useNavigate()
  const{cart} = useContext(Context)
  const fetchProfile = async()=>{
    try{
      await axios.get(`${userLink}/getuser`)
      .then((res)=>{
        setUser(res.data)
      })
    }catch{
      navigate("/login")
    }
  }
  useEffect(()=>{
    fetchProfile()
  },[])
  return (
    <>
        <div class="container d-flex justify-content-center align-items-center">
             
             <div class="cards">

              <div class="upper">

                <img src="https://i.imgur.com/Qtrsrk5.jpg" class="img-fluid" alt=''/>
                
              </div>

              <div class="user text-center">

                <div class="profile">

                  <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" class="rounded-circle" width="80" alt=''/>
                  
                </div>

              </div>


              <div class="mt-5 text-center">

                <h4 style={{color:"black",marginTop:"7rem",zIndex:"10"}} >{user.name}</h4>
                <span class="text-muted d-block mb-2">{user.city}</span>

                


                <div class="d-flex justify-content-between align-items-center mt-4 px-4" style={{gap:"1.5rem"}}>

                  <div class="stats">
                    <h6 class="mb-0">Total Orders</h6>
                    <span style={{fontSize:"1rem",fontWeight:"bold"}}>{user.totalOrders}</span>

                  </div>


                  <div class="stats">
                    <h6 class="mb-0">In Cart</h6>
                    <span style={{fontSize:"1rem",fontWeight:"bold"}}>{cart.length}</span>

                  </div>

                  <div class="stats">
                    <h6 class="mb-0">Join At</h6>
                    <span style={{fontSize:"1rem",fontWeight:"bold"}}>{user.JoinAt}</span>

                  </div>


                  
                  
                </div>
                
              </div>
               
             </div>

           </div>
    </>
  )
}

export default Profile