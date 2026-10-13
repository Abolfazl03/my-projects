const express= require('express');
const authController = require('../controllers/authController');
console.log(authController.registerUser)

const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router