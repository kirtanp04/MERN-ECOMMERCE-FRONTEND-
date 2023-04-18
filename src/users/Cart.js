import React, { useContext} from 'react'
import Navbar from './Navbar'
import { Context } from './Context/Context'
import { Scrollbars } from 'react-custom-scrollbars';

const Cart = () => {
    const { cart,removeProduct,singleProduct,addQuantity, decreaseQuantity } = useContext(Context)
    
    
    return (
        <>
            <Navbar />

            <div class="shopping-cart">

                <div class="title">
                    
                    Total: {cart.map((val)=>(val.quantity * val.price)).reduce((a,d)=>a+d,0)}
                
                </div>


                                    <Scrollbars style={{background:"grey" }}>

                {
                    cart.map((val,id) => {
                        
                        return (
                            <>
                                <div class="item" id={id} key={id}>
                                    <div class="buttons">
                                        <span class="delete-btn"></span>
                                        <span class="like-btn"></span>
                                    </div>

                                    <div class="image">
                                        <img src={val.image} alt="" />
                                    </div>

                                    <div class="description">
                                        <span>{val.name}</span>
                                        <span>Stock: {val.stock}</span>

                                    </div>

                                    <div class="quantity">
                                        <button onClick={()=>addQuantity(val._id)} class="plus-btn" style={{color:"black",pointerEvents:val.quantity === 5 ? "none" : "visible"}} type="button" name="button">
                                            +
                                        </button>
                                        <input type="text" style={{color:"black"}}  name="name" value={val.quantity} />
                                        <button onClick={()=>decreaseQuantity(val._id)} class="minus-btn" style={{color:"black",pointerEvents:val.quantity === 1 ? "none" : "visible"}}  type="button" name="button">
                                            -
                                        </button>
                                    </div>

                                    <div class="total-price">₹{val.quantity * val.price}</div>
                                    <div className="icon">
                                        <div className="icon-1" onClick={()=>removeProduct(id)}>

                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                            </svg>
                                        </div>

                                        <div className="icon-2" onClick={()=>singleProduct(val)}>

                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-view-list" viewBox="0 0 16 16">
                                                <path d="M3 4.5h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H3zM1 2a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 2zm0 12a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 14z" />
                                            </svg>
                                        </div>

                                    </div>
                                </div>
                                {/* <hr className='hrs' /> */}
                    </>
            )
            })
        }
                                </Scrollbars >
        </div >
        


        </>
    )
}

export default Cart