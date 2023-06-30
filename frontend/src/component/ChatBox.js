import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../context/chaprovider";
import SingleChat from "./SingleChat";


const ChatBox = ()=>{
    const {selectedChat, setSelectedChat}= ChatState();
    const {user,setUser} = ChatState();
    return(
      <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
   {selectedChat&&<SingleChat/>}
    </Box>
    )
}
export default ChatBox;