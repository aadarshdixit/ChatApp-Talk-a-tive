const Chat = require("../../model/chatModel");
const Message = require("../../model/message");
const User = require("../../model/userModel");


const sendMessage= async (req,res)=>{
    const {chatId , content}  = req.body;
    if(!content) {
        return res.send("blank message cannot be send");
    }
    try {
        var message = await Message.create({
            sender:req.user.id,
            content:content,
            chat:chatId,
        })
         
       var docs = await Message.findById(message._id).populate("sender", "name pic").populate("chat");
    
       docs = await User.populate(docs, {
        path:"chat.users",
        select :"name pic email",
       })
       
       await Chat.findByIdAndUpdate(chatId,{
        latestMessage:docs,
       })
  
       res.send(docs);
        
    } catch (error) {
        res.send(error.message);
    }
    

    
}
const fetchMessage =async (req,res)=>{
    //  const keyword  =  req.params;
    //  console.log(keyword);
    try {
        var allMessage = await Message.find({
            chat:req.params.chatId
        }).populate("sender" ,"name pic").populate("chat");
        res.send(allMessage);
    } catch (error) {
        res.send(error.message);
    }
    


}
module.exports = {sendMessage,fetchMessage};