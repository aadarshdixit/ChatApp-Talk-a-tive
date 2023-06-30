const mongoose  = require('mongoose');

const connectdb = async ()=>{
    try {
       const conn = await mongoose.connect(process.env.URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
       console.log(`database connected :${conn.connection.host}`);
    } catch (err) {
        console.log(err);
    }
}
module.exports = connectdb;