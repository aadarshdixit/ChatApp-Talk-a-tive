import { useDisclosure } from '@chakra-ui/hooks';
import React, { useEffect, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
  } from '@chakra-ui/react'
import { ChatState } from '../context/chaprovider';
import UserBadge from '../component/UserBadge';

 const UpdateModal =({children})=> {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {selectedChat, setSelectedChat}= ChatState();
    const {user,setUser} = ChatState();
    const [selectedGroupUsers,setSelectedGroupUsers] = useState([selectedChat.users]);


    const deleteUser = (deluser) => {
      setSelectedGroupUsers(selectedGroupUsers.filter((e) => e._id !== deluser._id))
  }

    return (
      <>
      <span onClick={onOpen}>{children}</span>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader >
            <Box display="flex" justifyContent="space-evenly">
            {selectedChat.chatName.toUpperCase()}
            </Box>
            </ModalHeader>
           
            <ModalCloseButton />
            <ModalBody>
            <Box display="flex" flexWrap="wrap">
            {
              selectedGroupUsers? (selectedGroupUsers.map((e) => {
                    return (
                      <UserBadge  key={e._id} 
                        handleDelete = {()=>{deleteUser(e)}}  event = {e}/>
                    )
                }))                                                                                                   
                :(console.log("MC"))
            }
            </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }
  export default UpdateModal;