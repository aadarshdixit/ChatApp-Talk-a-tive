const Chat = require("../../model/chatModel");
const User = require("../../model/userModel");

const searchChat = async (req,res)=>{
    const {friendId} = req.body;
    // console.log(req.body);
    // console.log(friendId);
    if(!friendId){
        res.status(401);
      throw new Error('friend doesnot create account in my prestigious  chat app');
    }
    console.log(friendId);
    var isChat = Chat.find({
        isGroupChat:false,
        $and:[
            { users: { $elemMatch: {$eq:req.user.id}}},
            { users: { $elemMatch: {$eq:friendId}}}
        ]
    }).populate("users","-password").populate("latestMessage");

     isChat = await User.populate(isChat,{
        path:"latestMessage.sender",
        select:"name pic email",
     })

    if(isChat.length>0){
        res.send(isChat[0]);
    }
    else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user.id, friendId ],
        };
        try {
            const newChat = await Chat.create(chatData);
            console.log(newChat);
               const fullChat = await Chat.findOne({_id:newChat._id}).populate("users","-password");
               res.status(200).send(fullChat);
        } catch (error) {
            res.status(400).send(error.message);
        }
       
    }
}
const fetchChat = async(req,res)=>{
    try {
        var allChat = await Chat.find({users:{$elemMatch:{$eq:req.user.id}}})
        .populate("users","-password")
        .populate("latestMessage")
        .populate("groupAdmin")
        .sort({updateAt:-1});

        allChat = await User.populate(allChat,{
            path:"latestMessage.sender",
            select:"name pic email",
        })
        
        res.send(allChat);
    } catch (error) {
        // console.log();
        res.send(error.message)
    }
}
const createGroupChat = async(req,res)=>{
    if(!req.body.groupChatName || !req.body.groupUser){
        // return res.send(
        return res.send("pls fill all the detail ");
    }
    var groupUsers = JSON.parse(req.body.groupUser);
    groupUsers.push(req.user.id);
    if(groupUsers.length<=2){
        return res.send('more than users requires toform group')
    }
    var groupChat = await Chat.find({
        isGroupChat:"true",
        users:groupUsers,
    }).populate("users","-password").populate("latestMessage").populate("groupAdmin");
     if(groupChat.length>0) res.send(groupChat[0]);
    else{
        // console.log("heloo");
        try {
            const groupChatdata = {
                chatName:req.body.groupChatName,
                isGroupChat:"true",
                users:groupUsers,
                groupAdmin:req.user.id,

            }
            const doc = await Chat.create(groupChatdata);
            const fullGroupChat = await Chat.findOne({_id:doc._id})
            .populate("users","-password").populate("latestMessage").populate("groupAdmin");

            res.send(fullGroupChat);
        } catch (error) {
           res.send(error.message); 
        }
    } 
}
const renameGroupChat = async(req,res)=>{
    const {groupChatId, newChatName} = req.body;
    // console.log(groupChatId);
    const update = await Chat.findByIdAndUpdate(groupChatId,{chatName:newChatName},{new:true});
    // console.log(update);
    if(!update){
        res.status(404);
        throw new Error('value not updated');
    }
    res.send(update);
     
}
const addToGroup = async(req,res)=>{
    const {friendId,groupId} = req.body;
    if(!friendId) {
        res.status(404);
        return res.send("pls select whom to add");
    }
    const adduser = await Chat.findByIdAndUpdate(groupId,{
        $push: { users: {$each: [friendId]}}
    },{new:true}).populate("users","-password").populate("latestMessage").populate("groupAdmin");
      
    if(!adduser) {
        res.status(404);
        return res.send('group not found');
    }
    res.send(adduser);
}

const removeFromGroup = async(req,res)=>{
    const {userid,groupId} = req.body;
    try {
        const removedData = await Chat.findByIdAndUpdate(groupId,
            { $pull: { users:userid}}
        )
        res.send(removedData);
    } catch (error) {
        res.send(error.message);
    }
   
}
module.exports = {searchChat,fetchChat,createGroupChat,renameGroupChat,addToGroup,removeFromGroup};