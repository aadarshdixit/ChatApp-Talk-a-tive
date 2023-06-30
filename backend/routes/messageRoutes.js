const express = require('express');
const verifyToken = require('../middleware/protect');
const { sendMessage, fetchMessage } = require('./controllers/messageController');
const router = express.Router();


router.post('/',verifyToken, sendMessage);
router.get('/:chatId',verifyToken,fetchMessage);


module.exports = router;