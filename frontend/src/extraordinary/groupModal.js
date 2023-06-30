import { useDisclosure } from '@chakra-ui/hooks';
import React, { useEffect, useState } from 'react';
import UserListItem from "../component/UserListItem";
import { SmallCloseIcon } from '@chakra-ui/icons'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    Box, Text, Badge, Stack, Toast, useToast
} from '@chakra-ui/react'
import { ChatState } from '../context/chaprovider';
import axios from 'axios';
import UserBadge from '../component/UserBadge';
const GroupModal = ({ children }) => {

    const [chatName, setChatName] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [userLoading, setUserLoading] = useState(false);
    const [userResult, setUserResult] = useState([]);
    const { user, setUser } = ChatState();
    const [input, setInput] = useState("")
    const [isToggle, setisToggle] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const { allChat, setAllChat } = ChatState();
    const [groupCreateLoading,setGroupCreateLoading] = useState(false);
    const toast = useToast();
    useEffect(() => {
        if (!isOpen) setInput("");
        setSelectedUsers([]);
    }, [isOpen])
    useEffect(() => {
        if (input === "") setisToggle(false);
        else {
            setisToggle(true);
            handelSearch();
        }
    }, [input])
    const handelSearch = async () => {
        if (!input) {
            console.log("no input");
            return;
        }
        try {
            setUserLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`/api/user?search=${input}`, config);
            // console.log(data);
            setUserResult(data);
            setUserLoading(false);
        } catch (error) {
            console.log(error.message);
        }
    }
    const deleteUser = (deluser) => {
        
        setSelectedUsers(selectedUsers.filter((e) => e._id !== deluser._id))
    }

    const addUser = (e) => {
        if (selectedUsers.includes(e)) {
            toast({
                title: "User already added",
                description: "pls add new user",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
            return;
        }
        setSelectedUsers([e, ...selectedUsers]);


    }
    const handleSubmit = async ()=>{
        setGroupCreateLoading(true);
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`
            }
        }
        const {data} = await axios.post('/api/chat/group', { groupChatName: chatName ,  groupUser:JSON.stringify(selectedUsers)},config);
        // console.log(data);
        
        setGroupCreateLoading(false);
       setAllChat([data,...allChat])
        onClose();
    }
    return (
        <>
            <span onClick={onOpen}>{children}</span>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Group Chat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box display="flex" flexDirection="column" justifyItems="space-evenly">
                            <Input placeholder='ChatName' marginBottom="10px"
                                onChange={(e) => { setChatName(e.target.value) }} value={chatName} />
                            <Input placeholder='Add User' onChange={(e) => { setInput(e.target.value) }} />
                        </Box>
                        <Box display="flex" flexWrap="wrap">
                            {
                                selectedUsers.map((e) => {
                                    return (
                                        <UserBadge  key={e._id} 
                                           handleDelete = {()=>{deleteUser(e)}}  event = {e}/>
                                    )
                                })
                            }
                        </Box>
                        {
                            userLoading ? (
                                <Box>
                                    <Text> Loading....</Text>
                                </Box>
                            )
                                : (
                                    <Box marginTop="10px">
                                        {userResult.map((e) => {
                                            return <Box >
                                                {
                                                    (isToggle && <UserListItem
                                                        user={e}
                                                        key={e._id}
                                                        handleChat={() => { addUser(e) }}
                                                    />)
                                                }
                                            </Box>

                                        })}
                                    </Box>
                                )
                        }


                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSubmit} isLoading = {groupCreateLoading}>
                            Create Chat
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupModal;