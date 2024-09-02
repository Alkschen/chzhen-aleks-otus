import { Router } from 'express';
import * as userController from '../controllers/userController';
import { checkAuthenticated, checkNotAuthenticated } from '../helpers/auth';

const router: Router = Router();

router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);
router.get('/logout', userController.logout);
router.get('/register', userController.getRegister);
router.post('/register', userController.postRegister)
router.get('/profile', checkAuthenticated, userController.getProfile);
router.delete('/profile/delete', userController.deleteUser);

export default router;