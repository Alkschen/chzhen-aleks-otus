const express = require('express');
const router = express.Router();
const userController = require('../../controllers/api/api-user-controller');

router.get('/api/users', userController.getUsers);
router.get('/api/users/:id', userController.getUserById);
router.delete('/api/users/:id', userController.deleteUser);
router.post('/api/register', userController.createUser);
router.put('/api/user-edit/:id', userController.updateUser);

module.exports = router;
