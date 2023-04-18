// import { useDisclosure } from "@chakra-ui/react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";


const Context = createContext()

const ContextFunction = ({children}) =>{
    const navigate = useNavigate()
    const[cart,setCart] = useState([])
    const[product,setProduct] = useState("")
    const[value,setValue] = useState("")
    // const { isOpen, onOpen, onClose } = useDisclosure()
    
    const addToCart = (val) =>{
        setCart([...cart,{...val,quantity:1}])
    // localStorage.setItem("cart",JSON.stringify(val))
    }
    const removeProduct = (id)=>{
        const data = cart.filter((item,ids) => ids !== id)
        setCart(data)
    }
    
    const singleProduct = (val)=>{
        setProduct(val)
        navigate(`/product/${val.name}/${val.title}`)
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
               in place of 'smooth' */
          });
    }

    const addQuantity = (id) =>{
       const datas = cart.map((val)=>{
        if(val._id === id){
            return{
                ...val,
                quantity: val.quantity + 1,    
            } 
        }
        return val
       })

       setCart(datas)
    }

    const decreaseQuantity = (id) =>{
        const value = cart.map((val)=>{
            if(val._id === id){
                return{
                    ...val,
                    quantity: val.quantity - 1
                }
            }
            return val
        })
        setCart(value)
    }

    return <Context.Provider value={{addToCart,cart,removeProduct,singleProduct,product,addQuantity,decreaseQuantity,
    value,setValue}}>{children}</Context.Provider>
}

export {Context, ContextFunction}