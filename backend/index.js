const express = require('express');
const cors = require('cors');
const connectdb = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js')
const chatRoutes = require('./routes/chatRoutes.js')
const messageRoutes = require('./routes/messageRoutes.js')
const app = express();
app.use(cors({
  origin : "http://localhost:3000",
  methods:["GET","POST"],
}));
app.use(express.json());
const http = require('http');

const server = http.createServer(app);
const dotenv = require('dotenv');

dotenv.config();
connectdb();

app.get('/', (req, res) => {
  res.send('heloo');
});

app.use('/api/user', userRoutes);      // auth api endpoint
app.use('/api/chat',chatRoutes);
app.use('/api/message', messageRoutes);

const port = process.env.PORT;
// console.log(port);
server.listen(port, () => {
  console.log(`listening on *:${port}`);
});