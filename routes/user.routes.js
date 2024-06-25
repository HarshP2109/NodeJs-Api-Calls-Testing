const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/users', authMiddleware, userController.getUsers);
router.get('/user/:userId', authMiddleware, userController.getUserById);
router.post('/createuser', authMiddleware, userController.createUser);
router.put('/user/:userId', authMiddleware, userController.updateUser);
router.patch('/user/:userId', authMiddleware, userController.updateUser);
router.delete('/user/:userId', authMiddleware, userController.deleteUser);

module.exports = router;
