import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Context } from './Context/Context'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, ButtonGroup, Divider, Image, Heading, CardBody, Stack, CardFooter } from '@chakra-ui/react'
import {
	Button,
	ChakraProvider,
	Text,
} from '@chakra-ui/react'
import axios from 'axios';
import { userLink } from '../mainLink';

const ProductDetail = () => {
	const { product, addToCart, singleProduct } = useContext(Context)
	const [sameProducts, setSameProduct] = useState([])
	const navigate = useNavigate()
	const { name } = useParams()

	const sameProduct = async () => {
		try {
			await axios.get(`${userLink}/similarproduct/${name}`)
				.then((res) => {
					setSameProduct(res.data)
				})
		} catch {
			alert("server error")
		}
	}
	useEffect(() => {
		sameProduct()
	})
	return (
		<>
			<Navbar />
			<div className="container" style={{ marginTop: "6rem" }} >
				<div className="cards" >
					<div className="container-fliud" >
						<div className="wrapper row">
							<div className="preview col-md-6">

								<div className="preview-pic tab-content">
									<div className="tab-pane active" id="pic-1"><img src={product.image} alt='' /></div>
								</div>
							</div>
							<div className="details col-md-6">
								<h3 className="product-title">{product.title}</h3>
								<div className="rating">
									<div className="stars">
										<span className="fa fa-star checked"></span>
										<span className="fa fa-star checked"></span>
										<span className="fa fa-star checked"></span>
										<span className="fa fa-star"></span>
										<span className="fa fa-star"></span>
									</div>
									<span className="review-no"><Typography component="legend">Rating</Typography>
										<Rating name="read-only" value={product.rating} readOnly /></span>
								</div>
								<p className="product-description">{product.description}</p>
								<h4 className="price">current price: <span>₹{product.price}</span></h4>
								<p className="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p>
								<h5 className="sizes">Brand:
									<span className="size" data-toggle="tooltip" title="small">{product.brand}</span>

								</h5>
								<h5 className="sizes">Stock:
									<span className="size" data-toggle="tooltip" title="small">{product.stock}</span>

								</h5>
								<h5 className="sizes">Feature:
									<span className="size" data-toggle="tooltip" title="small">{product.feature}</span>

								</h5>
								<h5 className="colors">colors:

									<span className="color" style={{ backgroundColor: product.color }}></span>

								</h5>
								<button className="" style={{ marginTop: "1rem" }} onClick={() => navigate("/")}>Back</button>
								<button className="" style={{ marginTop: "1rem" }} onClick={() => addToCart(product)}>Add to Cart</button>
								<button className="" style={{ marginTop: "1.5rem" }} onClick={()=>navigate(`/product/${product.name}/shipping`)}>Buy Now</button>


							</div>
						</div>
					</div>
				</div>
			</div><br />

			<div className="similar-product">
				<h2 style={{marginLeft:"3rem"}}>Similar Product</h2>
				<hr />

				<div className="right-home" style={{ marginTop: "3rem", marginLeft: "7rem" }}>
					<ChakraProvider>
						{
							sameProducts.map((val) => {
								return (
									<>
										<Card maxW='sm' borderColor={"black"}>
											<CardBody>
												<Image
													src={val.image}
													alt="{val.name}"
													borderRadius='lg'
													height={"7rem"}
													width={"7rem"}
												// mixBlendMode={"color-burn"}
												/>
												<Stack mt='6' spacing='3'>
													<Heading size='md'>{val.name}</Heading>
													<Text color='blue.600' fontSize='2xl'>
														₹{val.price}
													</Text>
												</Stack>
											</CardBody>
											<Divider />
											<CardFooter>
												<ButtonGroup spacing='2'>
													<Button onClick={() => singleProduct(val)} variant='solid' colorScheme='blue'>
														View
													</Button>
													<Button onClick={() => addToCart(val)} variant='ghost' colorScheme='blue'>
														Add to cart
													</Button>
												</ButtonGroup>
											</CardFooter>
										</Card>
									</>
								)
							})
						}


					</ChakraProvider>
				</div>
			</div>
		</>
	)
}

export default ProductDetail