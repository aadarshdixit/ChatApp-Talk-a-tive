const express = require('express');
const verifyToken = require('../middleware/protect');
const { searchChat, fetchChat, createGroupChat, renameGroupChat, addToGroup, removeFromGroup } = require('./controllers/chatController');
// const searchChat = require('./controllers/chatController');
const router = express.Router();

router.post('/', verifyToken, searchChat);
router.get('/', verifyToken, fetchChat);
router.post('/group', verifyToken, createGroupChat);
router.put('/renamegroup',verifyToken,renameGroupChat);
router.put('/addgroup', verifyToken,addToGroup);
router.put('/removegroup', verifyToken,removeFromGroup);
module.exports = router;