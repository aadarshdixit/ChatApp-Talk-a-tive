const generatetoken = require("../../config/generatetoken");
const User = require("../../model/userModel");
const bcrypt = require('bcryptjs');
const registerUser = async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('please filled all detail');
    }

    const userExit = await User.findOne({ email });
    if (userExit) {
        res.status(400);
        throw new Error('user already exit');
    }

    const doc = await User.create({
        name: name,
        email: email,
        password: password,
        pic: pic,
    })
    if (doc) {
        // console.log(doc);
        const data ={
            _id: doc.id,
            name: doc.name,
            email: doc.email,
            password:doc.password,
            pic: doc.pic,
            token: generatetoken(doc.id),
        }
        res.status(201).json(data);
        // console.log(data);
    }
    else {
        res.status(400);
        throw new Error('registration failed');
    }


}

const autho = async(req,res)=>{
    const {email,password} = req.body;
    const userExit = await User.findOne({email});
    if(userExit && (await bcrypt.compare(password,userExit.password))){
        const data = {
            _id: userExit.id,
            name: userExit.name,
            email: userExit.email,
            pic: userExit.pic,
            token: generatetoken(userExit.id),
        }
        res.status(201).json(data);
        // res.status(201);
        console.log(data);
    }
    else {
        res.status(401);
        throw new Error('invalid email and password');
    }

}
//   /api/user?search=username      // this is query
  const allUser = async (req,res)=>{
     const keyword  = req.query.search? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

    //  console.log(keyword);
    const users =  await User.find(keyword).find({_id:{$ne:req.user.id}})  
    //  console.log(users);
    res.send(users);
}       
module.exports = { registerUser,autho,allUser};
