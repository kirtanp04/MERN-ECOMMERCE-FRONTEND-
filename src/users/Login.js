import React,{useState,useEffect} from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Spinner,
  } from '@chakra-ui/react';
  import { ChakraProvider } from '@chakra-ui/react'
import { NavLink,useNavigate } from 'react-router-dom';
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import axios from 'axios';
import { userLink } from '../mainLink';

const Login = () => {
  const[email,setEmail] = useState("")
  const[pass,setPass] = useState("")
  const[loading,setLoading] = useState(false)
  useEffect(()=>{setLoading(false)
  },[])
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
    }else{
        setLoading(true)
      try{
        await axios.post(`${userLink}/login`,{
          email,pass
        }).then((res)=>{
          if(res.data.mess === "user not found"){
            Toastify({
              text: "User Not Found",
              duration: 1500,
              destination: "https://github.com/apvarun/toastify-js",
              newWindow: true,
              color:"black",
              gravity: "top", // `top` or `bottom`
              position: "center", // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                background: "Red",
              },
              onClick: function(){} // Callback after click
            }).showToast();
            setLoading(false)
          }else if(res.data.mess === "invalid pass"){
            Toastify({
              text: "Incorrect Password",
              duration: 1500,
              destination: "https://github.com/apvarun/toastify-js",
              newWindow: true,
              color:"black",
              gravity: "top", // `top` or `bottom`
              position: "center", // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                background: "Red",
              },
              onClick: function(){} // Callback after click
            }).showToast();
            setLoading(false)
          }else if(res.data.mess === "login success"){
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
            setTimeout(()=>{
              navigate("/")
            },1000)
          }
        })
      }catch{
        Toastify({
          text: "Server Error",
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
          <Heading color={"black"} fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel color={"black"} >Email address</FormLabel>
              <Input value={email} onChange={(e)=>setEmail(e.target.value)} borderColor={"black"} color={"black"} type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel color={"black"}  >Password</FormLabel>
              <Input value={pass} onChange={(e)=>setPass(e.target.value)} borderColor={"black"} color={"black"} type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                
                <Link color={'blue.400'}>Forgot password?</Link>
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

              <Spinner style={{marginLeft:"9rem"}} color='red' size='md' />
                </>
              }

            </Stack>
            <Text color={"black"}>Not have account? <NavLink to="/register" style={{color:"blue"}}>Register..</NavLink></Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    </ChakraProvider>

    </>
  )
}

export default Login