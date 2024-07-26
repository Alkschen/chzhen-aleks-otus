const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.delete('/users/:id', userController.deleteUser);
router.get('/register', userController.registerForm);
router.post('/register', userController.createUser);
router.get('/user-edit/:id', userController.editUserForm);
router.put('/user-edit/:id', userController.updateUser);

module.exports = router;
