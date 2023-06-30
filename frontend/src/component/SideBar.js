import { Box, Button, Tooltip, Text, Menu, MenuButton, Avatar, MenuList, MenuItem, Input, useToast, Spinner } from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai"
import { useDisclosure } from '@chakra-ui/hooks';
import ProfileModel from "../extraordinary/profileModal";
import { useNavigate } from 'react-router-dom';
import { Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, } from '@chakra-ui/react'
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";
import Message from "./message";
import { ChatState } from "../context/chaprovider";
const SideBare = () => {
    var user = localStorage.getItem("userInfo");
    user = JSON.parse(user)
    const [search, setSearch] = useState("");
    const { allChat, setAllChat } = ChatState();
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const { chatLoading, setChatloading } = ChatState();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isToggle, setisToggle] = useState(false);
    const { chat, setChat } = ChatState();
  
    useEffect(() => {
        if (!isOpen) {
            setSearch("");

        }
    }, [isOpen])
    useEffect(() => {
        if (search === "") {
            setisToggle(false);
        }
        else {
            setisToggle(true);
            searchHandler();
        }
    }, [search])
    const btnRef = React.useRef()
    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate('/');
    }
    const toast = useToast();
    const id = 'test-toast'

    const searchHandler = async () => {
        setLoading(true);
        if (!search) {
            console.log("heloo");
            if (!toast.isActive(id)) {
                toast({
                    id,
                    title: 'Fatal Error',
                    description: "Enter name or Email",
                    status: 'warning',
                    duration: 9000,
                    isClosable: true,
                    position: "top-left"
                })
            }
            setLoading(false);
            return;
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`/api/user?search=${search}`, config);
            console.log(data);
            setSearchResult(data);
            setLoading(false);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    }

    const accessChat = async (userid) => {
        try {
            setChatloading(true);
            // console.log(user);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.post('/api/chat/', { friendId: userid }, config);
            
            setChat(data);
            // setAllChat([data,...allChat]);
            setChatloading(false);
            onClose();
            return;

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <Box
                display="flex" justifyContent="space-between" paddingInline="20px" padding="5px" backgroundColor="gray.100">
                <Tooltip hasArrow label='Search Users to Chat' placement='bottom-end' >
                    <Button leftIcon={<AiOutlineSearch />} variant='ghost' fontSize="20px" ref={btnRef} colorScheme='teal' onClick={onOpen}>
                        Search
                    </Button>

                </Tooltip>

                <Text color='blue' fontSize='3xl'> ChitChat </Text>
                <div>
                    <Menu>
                        <MenuButton>
                            <BellIcon fontSize="3x1" m={1} w={8} h={8} />
                        </MenuButton>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} fontSize="20px">
                            <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} >
                            </Avatar>
                        </MenuButton>

                        <MenuList>
                            <ProfileModel user={user}>
                                <MenuItem >My Profile</MenuItem>
                            </ProfileModel>

                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>


            </Box>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader backgroundColor="gray.100" >Search User</DrawerHeader>
                    <DrawerBody>
                        <Box display="flex " justifyContent="space-evenly" marginBottom={"5px"} >
                            <Input placeholder="enter the name or email"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                            />
                            <Button marginLeft="15px" onClick={searchHandler}>Search</Button>

                        </Box >
                        {isToggle && <Box>
                            {
                                loading ?
                                    (<ChatLoading />)
                                    : (
                                        searchResult.length ?
                                            (searchResult.map((user) => {
                                                return <Box>
                                                    {
                                                        !chatLoading && <UserListItem
                                                            user={user}
                                                            key={user._id}
                                                            handleChat={() => { accessChat(user._id) }}
                                                        />
                                                    }
                                                </Box>

                                            })) : (
                                                <Message />
                                            )

                                    )
                            }
                        </Box>}
                        {chatLoading &&
                            <Box display="flex" flexDirection="horizontal" justifyContent="space-evenly">
                                <p marginTop="20px">Loading.....</p>
                                <Spinner
                                    thickness='4px'
                                    speed='0.65s'
                                    emptyColor='gray.200'
                                    color='blue.500'
                                    size='xl'
                                    marginTop="10px"
                                />
                            </Box>
                        }
                    </DrawerBody>

                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SideBare;