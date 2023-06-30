import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: 'Invalid Input.',
                description: "please fill all the details",
                status: 'warning',
                duration: 5000,
                isClosable: true,
            })
            setLoading(false);
            return;
        }
        else{
            const config = {
                headers: {
                    "Content-type": "application/json",
                  },
            }
             const {data} = await axios.post('/api/user/login',{
                email,
                password,
             },config);
             localStorage.setItem("userInfo", JSON.stringify(data));
             setLoading(false);
          navigate('/chats')
        }

    }

    return (
        <VStack spacing="5px">
            <FormControl isRequired id='email'>

                <FormLabel>Email</FormLabel>

                <Input type='email' placeholder="enter email" onChange={(e) => {
                    setEmail(e.target.value);
                }} value={email}  autoComplete="off" />
            </FormControl>

            <FormControl isRequired id='password'>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input
                      value={password}
                        type={show ? "text" : "password"}
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)
                        }
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Login
            </Button>
            <Button
                variant="solid"
                colorScheme="red"
                width="100%"
                onClick={() => {
                    setEmail("guest@example.com");
                    setPassword("123456");
                }}
            >
                Get Guest User Credentials
            </Button>

        </VStack>
    )


}
export default Login;
