import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { adminLink } from '../mainLink'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"


const AdminAddCategories = () => {
  const[categories,setCategorie] = useState("")
  const[loading,setLoading] = useState(false)
  useEffect(()=>{setLoading(false)},[])

  const Add = async()=>{
    try{setLoading(true)
      await axios.post(`${adminLink}/addcategories`,{categories})
      .then((res)=>{
         if(res.data.mess === "Added"){
          Toastify({
            text: "Success",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            color:"black",
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "green",
            },
            onClick: function(){} // Callback after click
          }).showToast();
          setLoading(false)
          setCategorie("")
        }
      })
    }catch{
      Toastify({
        text: "server error",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        color:"black",
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "red",
        },
        onClick: function(){} // Callback after click
      }).showToast();
      setLoading(false)
    }
  }
  return (
    <>
      <Header/>
      <div className="main" style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"1.5rem",marginTop:"7rem"}}>
      <TextField id="outlined-basic" value={categories} onChange={(e) => setCategorie(e.target.value)} label="Categorie" variant="outlined" />
      {
        !loading ?
        <>
        <Button variant="contained" onClick={Add}>Add Categorie</Button>
        </> : <>
        <div class="spinner-border text-danger" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>

        </>
      }
      </div>
      
    </>
  )
}

export default AdminAddCategories