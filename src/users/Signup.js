import React, { useEffect } from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    ChakraProvider,
    useColorModeValue,
    Spinner,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from "axios"
import { userLink } from '../mainLink';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const[fname,setFname] = useState("")
    const[lname,setLname] = useState("")
    const[email,setEmail] = useState("")
    const[city,setCity] = useState("")
    const[pass,setPass] = useState("")
    const[loading,setLoading] = useState(false)
    useEffect(()=>{setLoading(false)},[])
    const navigate = useNavigate()

  const Signup = async() =>{
    if(fname === ""){
      return  Toastify({
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
      
    }else if(city === ""){
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
    }else if(lname === ""){
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
    }else if(email === ""){
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
    }else if(pass === ""){
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
    }else{

      try{
        setLoading(true)
        await axios.post(`${userLink}/register`,{
          fname,lname,email,pass,city
        }).then((res)=>{
          if(res.data.mess === "user exist"){
            Toastify({
              text: "User Exist",
              duration: 1500,
              destination: "https://github.com/apvarun/toastify-js",
              newWindow: true,
              
              gravity: "top", // `top` or `bottom`
              position: "center", // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                background: "red",
              },
               // Callback after click
            }).showToast();
            setLoading(false)
          }else if(res.data.mess === "success"){
            Toastify({
              text: "Success",
              duration: 1500,
              destination: "https://github.com/apvarun/toastify-js",
              newWindow: true,
              
              gravity: "top", // `top` or `bottom`
              position: "center", // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                background: "green",
              },
               // Callback after click
            }).showToast();
            setLoading(false)
            setTimeout(()=>{
              navigate("/login")
            },1500)
          }
        })
  
      }catch{
        Toastify({
          text: "Server error",
          duration: 1500,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "red",
          },
           // Callback after click
        }).showToast();
        setLoading(false)
      }
    }
  }

  return (
    <>
    <ChakraProvider>

    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading color={"black"} fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel color={"black"}>First Name</FormLabel>
                  <Input value={fname} onChange={(e)=>setFname(e.target.value)} borderColor={"black"} color={"black"} type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel color={"black"}>Last Name</FormLabel>
                  <Input value={lname} onChange={(e)=>setLname(e.target.value)} borderColor={"black"} color={"black"} type="text" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel color={"black"}>Email address</FormLabel>
              <Input value={email} onChange={(e)=>setEmail(e.target.value)} borderColor={"black"} color={"black"} type="email" />
            </FormControl>
            <FormControl id="city" isRequired>
              <FormLabel color={"black"}>City</FormLabel>
              <Input value={city} onChange={(e)=>setCity(e.target.value)} borderColor={"black"} color={"black"} type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel color={"black"}>Password</FormLabel>
              <InputGroup>
                <Input value={pass} onChange={(e)=>setPass(e.target.value)} borderColor={"black"} color={"black"} type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    color={"black"}
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              {
                !loading ?
                <>
                <Button
                onClick={Signup}
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
                </> : <>

              <Spinner style={{marginLeft:"12rem"}} color='red' size='md' />
                </>
              }


            </Stack>
            <Stack pt={6}>
              <Text color={"black"} align={'center'}>
                Already a user? <NavLink to="/login" style={{color:'blue'}}>Login</NavLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>

    </ChakraProvider>

    </>
  )
}

export default Signup