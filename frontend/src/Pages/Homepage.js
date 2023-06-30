import {
  Box,  Button,Container,InputGroup,InputRightElement, Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { FormControl, FormLabel, Input, VStack,useToast } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import Login from "../component/Authentication/login";
function Homepage() {
   const navigate = useNavigate();
   let location = useLocation();
   useEffect(() => {
     const user = JSON.parse(localStorage.getItem("userInfo"));
     if (user) navigate("/chats");
   }, [location]);


  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const [show1, setShow1] = useState(false) 
  const handleClick1 = () => setShow1(!show1)
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [name,setName] = useState("");
 const [email,setEmail] = useState("");
 const [pic,setPic] = useState();
 const [picLoading,setPicLoading] = useState(false);
 const toast = useToast()

  const submitHandler = async ()=>{
    setPicLoading(true);
     if(!name || !email || !password || !cpassword){
      toast({
        title: 'Invalid Input.',
        description: "please fill all the details",
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      setPicLoading(false);
      return;
     }
     if(password!=cpassword){
      toast({
        title: 'Not Matching',
        description: "Password does not match",
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      return;
     }
  
     try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const {data}  = await axios.post('/api/user', {
        name,
        email,
        password,
        pic,
      },
        config
      );
       console.log(data);
       toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
     
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      navigate('/chats')
     } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
     }

  }


  const postDetails =(pics)=>{
    // setPicLoading(true);
    //  if(pics=== undefined) {
    //   toast({
    //     title: "Please Select an Image!",
    //     status: "warning",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "bottom",
    //   });
    //   return ;
    //  }
    //  if(pics.type === 'image/jpeg'  || pics.type === 'image/png'|| pics.type ==='image/jpg'){
    //    const data = new FormData();
    //    data.append('file',pics);
    //    body.append("upload_preset", 'CLOUDINARY_PRESET')
    //    fetch("https://api.cloudinary.com/v1_1/deloemjzj", {
    //     method: "post",
    //     body: data,
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setPic(data.url.toString());
    //       console.log(data.url.toString());
    //       setPicLoading(false);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       setPicLoading(false);
    //     });
    //  }
    //  else {
    //   toast({
    //     title: "Please Image!",
    //     status: "warning",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "bottom",
    //   });
    //   setPicLoading(false);
    //   return;
    // }
  }

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Work sans">
          Talk-A-Tive
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">

        <Tabs isFitted variant="soft-rounded">
          <TabList>
            <Tab>Login</Tab>
            <Tab>Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              
            <Login/>
            
            </TabPanel>
            <TabPanel>
              <VStack spacing="5px">
                <FormControl isRequired id='first-name'>
                  <FormLabel>Name</FormLabel>
                  <Input placeholder='enter name' onChange={(e)=>{
                    setName(e.target.value);
                  }} autoComplete="off"/>
                </FormControl>
                <FormControl isRequired id='email'>
                  <FormLabel>Email</FormLabel>
                  <Input type='email' placeholder="enter email" onChange={(e)=>{
                    setEmail(e.target.value);
                  }} autoComplete="off" />
                </FormControl>
                <FormControl isRequired id='password'>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      type={show ? "text" : "password"}
                      placeholder="Enter Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl isRequired id='cpassword'>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      type={show1 ? "text" : "password"}
                      placeholder="Enter confirm Password"
                      onChange={(e) => setCPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick1}>
                        {show1 ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl id="pic">
                <FormLabel>Upload your Picture</FormLabel>
                <Input
                  type="file"
                  p={1.5}
                  accept="image/*"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
              </FormControl>


               <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Sign Up
      </Button>
              </VStack>
            </TabPanel>

          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;