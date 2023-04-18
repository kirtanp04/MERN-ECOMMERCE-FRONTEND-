import React, { useEffect, useState } from 'react'
import Header from './Header'
import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  ChakraProvider,
  useColorModeValue,
} from '@chakra-ui/react';
// import { ReactNode } from 'react';
import { adminLink } from '../mainLink';
import axios from 'axios';
import SpinnerLoading from '../users/Spinner';



function StatsCard(props) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}>
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} isTruncated>
          {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

const AdminHome = () => {
  const[user,setUser] = useState("")
  const[categorie,setCategorie] = useState("")
  const[outOfStock,setOutOsStock] = useState("")
  const[inStock,setInStock] = useState("")
  const[product,setProduct] = useState("")
  const[loading,setLoading] = useState(false)


  const Fetch = async()=>{
    try{
      await axios.get(`${adminLink}/totaldata`)
      .then((res)=>{
        setUser(res.data.user)
        setCategorie(res.data.categoriesData)
        setOutOsStock(res.data.stockNo)
        setInStock(res.data.stockYes)
        setProduct(res.data.productData)
        setLoading(true)
      })
    }catch{
      alert("server error")
    }
  }

useEffect(()=>{
Fetch()
setLoading(false)
},[])

  return (
    <>
      <Header/>

      {
        loading ?
        <>
        <ChakraProvider>
      <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={'center'}
        fontSize={'4xl'}
        py={10}
        marginTop={"2rem"}
        fontWeight={'bold'}>
        Statistic.
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={'Total-Users'}
          stat={user}
          
        />
        <StatsCard
          title={'Total-Products'}
          stat={product}
          
        />
        <StatsCard
          title={'Total-Categories'}
          stat={categorie}
          
        />
        <StatsCard
          title={'Out-Of-Stock'}
          stat={outOfStock}
          
        />
        <StatsCard
          title={'In-Stock'}
          stat={inStock}
          
        />
        
      </SimpleGrid>
    </Box>
    </ChakraProvider>
        </>
        :
         <>
            <SpinnerLoading/>
         </>
      }
    </>
  )
}

export default AdminHome