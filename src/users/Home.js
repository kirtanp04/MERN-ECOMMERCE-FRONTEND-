import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { adminLink, userLink } from '../mainLink'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  ChakraProvider,
  Text,
  Input,
} from '@chakra-ui/react'
import { Card, ButtonGroup, Divider, Image, Heading, CardBody, Stack, CardFooter } from '@chakra-ui/react'
import { Context } from './Context/Context'
import SpinnerLoading from './Spinner'

const Home = () => {
  const { addToCart, singleProduct, value } = useContext(Context)
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [product, setProduct] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [search, setSearch] = useState("")
  const btnRef = React.useRef()

  const fetchCategories = async () => {

    try {
      await axios.get(`${adminLink}/getcategories`)
        .then((res) => {
          setCategories(res.data)
        })
    } catch {
      alert("server error")
    }
  }

  const fetchProduct = async () => {
    try {
      setLoading(false)
      await axios.get(`${userLink}/getproduct`)
        .then((res) => {
          setProduct(res.data)
          setLoading(true)
        })

    } catch {
      alert("server error")
    }
  }

  const getByCategorie = async(name) =>{
    try{
      setLoading(false)
       await axios.get(`${userLink}/getbycategories/${name}`)
      .then((res)=>{
        setProduct(res.data)
        onClose()
        setLoading(true)
      })

    }catch{
      alert(" Server error")
    }
  }

  useEffect(() => {
    setLoading(false)
    fetchCategories()
    fetchProduct()
  }, [])

  return (
    <>
      <Navbar />
      <ChakraProvider>
        {
          loading ?
            <>
              <div class=" mb-4" style={{ marginTop: "2.5rem", display: "flex", flexDirection: "row", padding: "10px 0 20px 0", gap: "3rem" }}>

                <div className="left" style={{ marginLeft: "2rem" }}>

                  <Button marginTop={"3rem"} position={"fixed"} ref={btnRef} colorScheme='teal' onClick={onOpen}>
                    Categories??
                  </Button>
                  <Drawer
                    isOpen={isOpen}
                    placement='right'
                    onClose={onClose}
                    finalFocusRef={btnRef}
                  >
                    <DrawerOverlay />
                    <DrawerContent>
                      <DrawerCloseButton />
                      <DrawerHeader>Categories</DrawerHeader>

                      <DrawerBody>
                        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Type here...' /><br />
                        {

                          // eslint-disable-next-line array-callback-return
                          categories.filter((data) => {
                            if (data.categorie.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                              return data
                            }
                          }).map((val) => {
                            return (
                              <>
                                <div className="list" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                  <Text textTransform={"capitalize"} onClick={()=>getByCategorie(val.categorie)} cursor={"pointer"} marginTop={"2rem"}>{val.categorie}</Text>
                                </div>
                              </>
                            )
                          })
                        }

                      </DrawerBody>

                      <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                          Cancel
                        </Button>

                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </div>

                <div className="right-home" style={{ marginTop: "3rem", marginLeft: "7rem" }}>
                  {
                    // eslint-disable-next-line array-callback-return
                    product.filter((datas) => {
                      if (datas.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())) {
                        return datas
                      }
                    }).map((val) => {
                      return (
                        <>
                          <Card maxW='sm'>
                            <CardBody>
                              <Image
                                src={val.image}
                                alt={val.name}
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


                </div>
              </div>
            </>
            :
            <>
              <SpinnerLoading />
            </>
        }
      </ChakraProvider>
    </>
  )
}

export default Home