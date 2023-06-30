import { Text,IconButton } from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../context/chaprovider";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { AiFillEye } from "react-icons/ai";
import ProfileModel from "../extraordinary/profileModal";
import UpdateModal from "../extraordinary/UpdateGroupModal";

const SingleChat = ()=>{
    const {selectedChat, setSelectedChat}= ChatState();
    const {user,setUser} = ChatState();
  // console.log(user.name);
  console.log(selectedChat);
   return(
    <>
    
    <Text
    fontSize={{ base: "28px", md: "30px" }}
    pb={3}
    px={2}
    w="100%"
    fontFamily="Work sans"
    display="flex"
    justifyContent={{ base: "space-between" }}
    alignItems="center"
    >
    <IconButton
    onClick={()=>{setSelectedChat("")}}
    d={{ base: "flex", md: "none" }}
    icon={<ArrowBackIcon />}
    />
    {
        selectedChat.isGroupChat ? (
          selectedChat.chatName.toUpperCase()
        ) : (
          (user.name === selectedChat.users[0].name) ? (selectedChat.users[1].name.toUpperCase()) : (selectedChat.users[0].name.toUpperCase())
        )
      }
      {
        selectedChat.isGroupChat?
       (
         <UpdateModal>
         <IconButton
         d={{ base: "flex", md: "none" }}
         icon={<AiFillEye/>}
         />
         </UpdateModal>  
       )
        :(
            <ProfileModel user = {(user.name === selectedChat.users[0].name) ? (selectedChat.users[1]) : (selectedChat.users[0])}>
            <IconButton
                d={{ base: "flex", md: "none" }}
                icon={<AiFillEye/>}
                />
            </ProfileModel>
        )
      }
    </Text>
    </>
   )
}
export default SingleChat;