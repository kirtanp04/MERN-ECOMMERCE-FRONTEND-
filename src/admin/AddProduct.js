import React, { useEffect, useState } from 'react'
import Header from './Header'
import { TextField, Button } from '@mui/material'
import axios from 'axios';
import { adminLink } from '../mainLink';
import {Menu,} from '@chakra-ui/react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { userLink } from '../mainLink';


const AdminAddProduct = () => {
  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [price, setPrice] = useState("")
  const [categorie, setCategorie] = useState("")
  const [brand, setBrand] = useState("")
  const [feature, setFeature] = useState("")
  const [rating, setRating] = useState("")
  const [stock, setStock] = useState("")
  const [color, setColor] = useState("")
  const [image, setImage] = useState("")
  const [categorieData, setCategorieData] = useState([])
  const[product,setProduct] = useState([])
  const[loading,setLoading] = useState(false)
  const[pic,setPic] = useState([])

  const sortOn = (property)=>{
    return function(a, b){
        if(a[property] < b[property]){
            return -1;
        }else if(a[property] > b[property]){
            return 1;
        }else{
            return 0;   
        }
    }
}
   product.sort(sortOn("name"))

  const Fetch = async () => {
    try {
      await axios.get(`${adminLink}/getcategories`)
        .then((res) => {
          setCategorieData(res.data)
        })
    } catch {
      alert("server error")
    }
  }

  const fetchProduct = async()=>{
    try{
      await axios.get(`${userLink}/getproduct`)
      .then((res)=>{
        setProduct(res.data)
      })

    }catch{
      alert("server error")
    }
  }

  useEffect(() => {
    Fetch()
    fetchProduct()
    setLoading(false)
    // console.log(productData)
  }, [])

  const Send = async()=>{
    try{
      // const picData = new FormData()
      // for(let i = 0; i < pic.length; i++){
      //   picData.append(`images[${i}]`,pic[0])
      // }
      // console.log(picData)
      setLoading(true)
      await axios.post(`${adminLink}/addproduct`,{
        name,title,desc,price,categorie,brand,feature,rating,stock,color,image,
      }).then((res)=>{
        if(res.data.mess === "success"){
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
          setName("") 
          setBrand("")
          setCategorie("")
          setColor("")
          setDesc("")
          setFeature("")
          setImage("")
          setRating("")
          setPrice("")
          setStock("")
          setTitle("")
        }
      })
    }catch{
      Toastify({
        text: "Server error",
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
      setName("") 
      setBrand("")
      setCategorie("")
      setColor("")
      setDesc("")
      setFeature("")
      setImage("")
      setRating("")
      setPrice("")
      setStock("")
      setTitle("")
    }
  }

  const Change = async (e) => {
     const data =e.target.files[0]
    const base64 = await convertImg(data)
    // setPic([data])
    setImage(base64)
    // console.log(categorie)

  }
  const convertImg = (data) => {
    return new Promise((sucess, fail) => {
      const fileRender = new FileReader();
      fileRender.readAsDataURL(data);

      fileRender.onload = () => {

        sucess(fileRender.result);
        // console.log(files)
      }
      fileRender.onerror = (e) => {
        fail(e);
      }

    })
  }

  return (
    <>
      <Header />
      {/* <h1 style={{ display: "flex", justifyContent: "center", marginTop: "1.5rem" }}>Add Your Product</h1><br /> */}
      <div className="field" style={{ display: "flex", justifyContent: "center", flexDirection: "row", gap: "3rem", alignItems: "center", marginTop:"7rem"}}>
        <div className="right" style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: "1rem" }} >
          <input type="file" multiple onChange={Change} />
          <TextField id="outlined-basic" value={name} onChange={(e) => setName(e.target.value)} label="Name" variant="outlined" />
          <TextField id="outlined-basic" value={title} onChange={(e) => setTitle(e.target.value)} label="Title" variant="outlined" />
          <TextField id="outlined-basic" value={brand} onChange={(e) => setBrand(e.target.value)} label="Brand" variant="outlined" />
          
          <Menu>
            <select onChange={(e)=>setCategorie(e.target.value)}>
            {
              categorieData.map((val) => {
                return (
                  <>
                      <option value={val.categorie}>{val.categorie}</option>  
                  </>
                )
              })
            }
            </select>
          </Menu>

          <TextField id="outlined-basic" value={feature} onChange={(e) => setFeature(e.target.value)} label="Feature" variant="outlined" />
        </div>
        <div className="left" style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
          {
            ! loading ?
            <><Button variant="contained" onClick={Send}>Add Product</Button></>
            : <>

          <div class="spinner-border text-danger" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
            </>
          }
          <TextField id="outlined-basic" value={desc} onChange={(e) => setDesc(e.target.value)} label="Description" variant="outlined" />
          <TextField id="outlined-basic" value={color} onChange={(e) => setColor(e.target.value)} label="Color" variant="outlined" />
          <TextField id="outlined-basic" value={stock} onChange={(e) => setStock(e.target.value)} label="Stock" variant="outlined" />
          <TextField id="outlined-basic" value={price} onChange={(e) => setPrice(e.target.value)} label="Price" variant="outlined" />
          <TextField id="outlined-basic" value={rating} onChange={(e) => setRating(e.target.value)} label="Rating" variant="outlined" />
        </div>
      </div>
          <div className="table" style={{padding:"0 20px 0 20px"}}>
      <TableContainer component={Paper} style={{marginTop:"3rem",padding:"0 40px 0 40px",backgroundColor:"grey",color:"white"}}>
      <Table sx={{ minWidth: 600 }} aria-label="simple table" >
        <TableHead >
          <TableRow >
            <TableCell style={{color:"yellow",fontWeight:"bold"}}>No</TableCell>
            <TableCell align="center" style={{color:"yellow",fontWeight:"bold"}}>Name</TableCell>
            <TableCell align="center" style={{color:"yellow",fontWeight:"bold"}}>Brand</TableCell>
            <TableCell align="center" style={{color:"yellow",fontWeight:"bold"}}>Categorie</TableCell>
            <TableCell align="center" style={{color:"yellow",fontWeight:"bold"}}>Color</TableCell>
            <TableCell align="center" style={{color:"yellow",fontWeight:"bold"}}>Stock</TableCell>
            <TableCell align="center" style={{color:"yellow",fontWeight:"bold"}}>Rating</TableCell>
            <TableCell align="center" style={{color:"yellow",fontWeight:"bold"}}>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
            {
              product.map((val,id)=>{
                return (
                  <>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="center" style={{color:"yellow",fontWeight:"bold"}}>
                {id + 1}
              </TableCell>
              <TableCell align="center" style={{color:"white"}}>{val.name}</TableCell>
              <TableCell align="center" style={{color:"white"}}>{val.brand}</TableCell>
              <TableCell align="center" style={{color:"white"}}>{val.categorie}</TableCell>
              <TableCell align="center" style={{color:"white"}}>{val.color}</TableCell>
              <TableCell align="center" style={{color:val.stock === "no"? "red" : "white"}}>{val.stock}</TableCell>
              <TableCell align="center" style={{color:"white"}}>{val.rating}</TableCell>
              <TableCell align="center" style={{color:"white"}}>{val.price}</TableCell>
            </TableRow>
                  </>
                )
              })
            }
          
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </>
  )
}

export default AdminAddProduct