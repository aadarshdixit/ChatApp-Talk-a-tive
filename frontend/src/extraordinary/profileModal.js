import { useDisclosure } from '@chakra-ui/hooks';
import { ViewIcon } from '@chakra-ui/icons';
import { IconButton, Image, Text } from '@chakra-ui/react';
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react'
const ProfileModel = ({user,children}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return(
    <>
     { children?(<span onClick={onOpen}>{children}</span>)
      :<IconButton  icon={<ViewIcon/>}   onClick={onOpen}/>}

      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex"    justifyContent="space-evenly" >
          <Image boxSize='150px'  src={user.pic} alt= {user.default} borderRadius='full'/>
          <Text fontSize="3xl">{user.name}</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
         
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
   
  )
  
};

export default ProfileModel;
