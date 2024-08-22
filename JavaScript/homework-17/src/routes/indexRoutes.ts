import { Router, Request, Response } from 'express';
// import { checkAuthenticated } from '../helpers/auth';
import { IUser as User } from '../models/User';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    const title = 'Home';
    const users: User | undefined = req.user as User;
    res
        .status(200)
        .render('index', { title, users: users });
});

router.get('/about', (req: Request, res: Response) => {
    const title = 'О проекте';
    const users: User | undefined = req.user as User;
    res.render('about', { title, users: users });
});

router.get('/contacts', (req: Request, res: Response) => {
    res.redirect('/about');
});

export default router;