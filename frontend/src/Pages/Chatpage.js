import React, { useEffect, useState } from 'react';
import { ChatState } from '../context/chaprovider';
import SideBar from '../component/SideBar';
import MyChats from '../component/MyChats';
import Chatbox from '../component/ChatBox';
import { Box } from '@chakra-ui/react'
const Chatpage = () => {
   const {user} = ChatState();
   const {selectedChat, setSelectedChat}= ChatState();
   return(
      <div style={{ width: "100%" }}>
      {  <SideBar />}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats/>}
         {user && selectedChat && <Chatbox/>}
      </Box>
    </div>
   )
}
export default Chatpage;