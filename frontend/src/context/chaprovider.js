import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
const chatContext = createContext();

const ChatProvider = ({children})=>{
    const [user,setUser] = useState();
    const [allChat,setAllChat] = useState();
    const [chat,setChat] = useState();
    const [chatLoading, setChatloading]  = useState(false);
    const [selectedChat, setSelectedChat] = useState();
    // const navigate = useNavigate();

    useEffect(()=>{
       var x = JSON.parse(localStorage.getItem("userInfo"));
       setUser(x);
    },[])
   return <chatContext.Provider value ={{user,setUser,allChat,setAllChat,chat,setChat,chatLoading,setChatloading,selectedChat,setSelectedChat}}>{children}</chatContext.Provider>
};

export const ChatState = ()=>{
    return useContext(chatContext);
}

export default ChatProvider;