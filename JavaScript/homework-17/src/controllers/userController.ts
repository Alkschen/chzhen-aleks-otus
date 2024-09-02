import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
// добавить валидацию
// import { body, check, validationResult } from "express-validator";
import { IUser as User } from '../models/User';
import { UserRepository } from '../repositories/userRepository';
import "../config/passport";

const userRepository = new UserRepository();

/**
 * Страница авторизации
 * @route GET /login
 */
export const getLogin = (req: Request, res: Response): void => {
    // console.log('userController.getLogin');
    const users: User | undefined = req.user as User;
    if (req.user) {
        return res.redirect('/');
    }
    res.render('users/login', { title: 'Авторизация', users: users });
};

/**
 * Авторизация пользователя
 * @route POST /login
 */

export const postLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    passport.authenticate('local', (err: Error, user: User, info: any) => {
        if (err) { return next(err) }
        if (!user) {
            req.flash('error', info.message);
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) { return next(err) }
            req.flash('success', 'Вы авторизовались');
            return res.redirect('/profile');
        });
    })(req, res, next);
}
// Тоже самое только с параметрами (successRedirect, failureRedirect, failureFlash):
// passport.authenticate('local', {
//     successRedirect: '/profile',
//     failureRedirect: '/login',
//     failureFlash: true
// })

/**
 * Выход из системы
 * @route GET /logout
 */
export const logout = (req: Request, res: Response, next: NextFunction): void => {
    console.log('userController.logout');
    req.logout((err) => {
        if (err) { return next(err) }
        req.flash('success', 'Вы вышли из аккаунта');
        req.session.destroy((err) => {
            if (err) { return next(err) }
            // console.log('Вы вышли из аккаунта');
            res.redirect('/login');
        });
    });
};

/**
 * Страница регистрации пользователя
 * @route GET /register
 */
export const getRegister = (req: Request, res: Response): void => {
    const users: User | undefined = req.user as User;
    if (req.user) {
        return res.redirect('/');
    }
    res.render('users/register', { title: 'Регистрация', users: users });
};

/**
 * Регистрация пользователя
 * @route POST /register
 */
export const postRegister = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            req.flash('error', 'Не все поля заполнены');
            return res.redirect('/register');
        }
        const checkUser = await userRepository.findByUsername(req.body.username);
        if (checkUser) {
            req.flash('error', 'Пользователь с таким именем уже существует');
            return res.redirect('/register');
        }
        const hashedPassword = await userRepository.hashPassword(password);
        const user = { 
            username, 
            email, 
            password: hashedPassword
        };
        const newUser = await userRepository.createUser(user);
        req.login(newUser, (err) => {
            if (err) { return next(err) }
            req.flash('success', 'Вы зарегистрировались');
            res.redirect('/profile');
        });
    } catch (err) {
        req.flash('error', 'Произошла ошибка при регистрации');
        res.redirect('/register');
        next(err);
    }
};

/**
 * Страница профиля
 * @route GET /profile
 */
export const getProfile = (req: Request, res: Response): void => {
    const users: User | undefined = req.user as User;
    res.render('users/profile', { title: 'Профиль', users: users });
};

/**
 * Удаление пользователя
 * @route GET /profile/delete
 */ 

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => { 
    try {
        const userId = req.body.id;
        await userRepository.deleteUser(parseInt(userId));
        req.logout((err) => {
            if (err) { return next(err) }
            req.flash('success', 'Вы удалили профиль');
            req.session.destroy((err) => {
                if (err) { return next(err) }
                res.redirect('/login');
            });
        });
    } catch (err) {
        req.flash('error', 'Произошла ошибка при удалении профиля');
        res.redirect('/profile');
        next(err);
    }
};

