const express  =  require('express');
const { registerUser, autho, allUser } = require('./controllers/userControll');
const verifyToken = require('../middleware/protect');
// const useRoutes = 
const router = express.Router();
router.post('/',registerUser);
router.get('/', verifyToken,allUser);
router.post('/login', autho);
module.exports = router;
