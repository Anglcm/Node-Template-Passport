const { Router } = require('express');
const router = Router();

const userController = require('../controllers/user.controller');

const {  requireAuth } = require('../middleware/auth');

router.get('/getAllUsers', requireAuth, userController.getAllUser);
router.post('/registerUser', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;