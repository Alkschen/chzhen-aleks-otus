import { Router } from 'express';
import apiUserController from '../../controllers/api/apiUserController';

const router: Router = Router();

router.post('/register', apiUserController.createUser);
router.get('/users', apiUserController.getUsers);
router.get('/users/:id', apiUserController.getUserById);
router.put('/users/:id', apiUserController.updateUser);
router.delete('/users/:id', apiUserController.deleteUser);

export default router;