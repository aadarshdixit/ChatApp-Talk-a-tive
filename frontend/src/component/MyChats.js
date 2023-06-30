import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatState } from "../context/chaprovider";
import { Box, Button, Stack, Text } from '@chakra-ui/react'
import GroupModal from "../extraordinary/groupModal"

const MyChats = () => {
  var user = localStorage.getItem("userInfo");
  user = JSON.parse(user)
  const { allChat, setAllChat } = ChatState();
  const { chat, setChat } = ChatState();
  const { chatLoading, setChatloading } = ChatState();
  const {selectedChat, setSelectedChat}= ChatState();
  const fetchAllChat = async () => {
    const config = {
      headers: {
        authorization: `Bearer ${user.token}`
      }
    }
    const { data } = await axios.get('/api/chat/', config);

    setAllChat(data);
    setChatloading(false);
  }
  useEffect(() => {
    fetchAllChat();
  }, [chat])

  return (
    <Box d={{ base: chat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    //  backgroundColor="gray.100"
    >
      <Box pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center">
        <Text>My Chats</Text>
         <GroupModal>
        <Button d="flex" fontSize={{ base: "17px", md: "10px", lg: "17px" }} >New Group Chat</Button>
        </GroupModal>
       
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {
          allChat ? (
            <Stack overflowY="scroll">
              {
                allChat.map((c) => {
                  // console.log(c.latestMessage);
                  
                  return <Box
                    onClick={() => setSelectedChat(c)}
                    cursor="pointer"
                    bg={selectedChat === c ? "#38B2AC" : "#E8E8E8"}
                    color={selectedChat === c ? "white" : "black"}
                    px={3}
                    py={2}
                      borderRadius="lg"
                    key={c._id}
                  >
                    <Text>
                      {
                        c.isGroupChat ? (
                          c.chatName
                        ) : (
                          (user.name === c.users[0].name) ? (c.users[1].name) : (c.users[0].name)
                        )
                      }
                    </Text>
                    {c.latestMessage && (
                      <Text fontSize="xs">
                        <b>{c.latestMessage.sender.name} : </b>
                        {c.latestMessage.content.length > 50
                          ? c.latestMessage.content.substring(0, 51) + "..."
                          : c.latestMessage.content}
                      </Text>)
                    }
                  </Box>
                })
              }
            </Stack>
          ) :
            console.log("chatloading")
        }

      </Box>
    </Box>
  )
}
export default MyChats;