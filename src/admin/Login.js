import React, { useState,useEffect } from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import axios from 'axios';
import { adminLink } from '../mainLink';
import {useNavigate} from "react-router-dom"

const AdminLogin = () => {
  const[email,setEmail] = useState("")
  const[pass,setPass] = useState("")
  const[loading,setLoading] = useState(false)
  useEffect(()=>{setLoading(false)},[])
  const navigate = useNavigate()


const Login = async()=>{
  if(email === ""){
    return Toastify({
      text: "fill details",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      color:"black",
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "yellow",
      },
      onClick: function(){} // Callback after click
    }).showToast();
  }
  if(pass === ""){
    return Toastify({
      text: "fill details",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      color:"black",
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "yellow",
      },
      onClick: function(){} // Callback after click
    }).showToast();
  }
  try{
    setLoading(true)
    await axios.post(`${adminLink}/login`,{
      email,pass
    }).then((res)=>{
      if(res.data.mess === "You are not admin"){
        Toastify({
          text: "You are not admin",
          duration: 1500,
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
      }else if(res.data.mess === "wrong pass"){
        Toastify({
          text: "Invalid Password",
          duration: 1500,
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
      }else if(res.data.mess === "Success"){
        Toastify({
          text: "Success",
          duration: 1500,
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
        setTimeout(()=>{navigate("/admin")},1500)
      }
    })
  }catch{
    Toastify({
      text: "Server error",
      duration: 1500,
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
    <ChakraProvider>
      <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('white', 'white')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading color={"black"} fontSize={'4xl'}>Admin Page</Heading>
          
        </Stack>
        <Box
        width={"100%"}
          rounded={'lg'}
          bg={useColorModeValue('black', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input value={pass} onChange={(e)=>setPass(e.target.value)} type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
              </Stack>
              {
                !loading ? 
                <>
                <Button
              onClick={Login}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
                </> : <>

              <Spinner style={{marginLeft:"6rem"}} color='red' size='md' />
                </>
              }
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    </ChakraProvider>
    </>
  )
}

export default AdminLogin