const express = require('express');
const router = express.Router();
const passport = require('passport');

const initializePassport = require('../config/passport');
const { checkAuthenticated, checkNotAuthenticated } = require('../helpers/auth');
const createPath = require('../helpers/create-path');

initializePassport(passport);

router.get('/profile', checkAuthenticated, (req, res) => {
    const title = 'Профиль';
    console.log('req.user', req.user);
    res.render(createPath('users/profile'), { title, users: req.user });
});

router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render(createPath('users/login'), { title: 'Авторизация', users: req.user });
});
// Маршрут для логина
router.post('/login', checkNotAuthenticated, passport.authenticate('login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/logout', (req, res, next) => {
    req.logout( function(err) {
        if (err) { return next(err); }
        req.flash('success_msg', 'Вы вышли из аккаунта');
        res.redirect('/login');
    });
}); 

router.get('/register', checkNotAuthenticated, (req, res) => {
    const title = 'Регистрация';
    res.render(createPath('users/register'), { title, users: req.user });
});
// Маршрут для регистрации
router.post('/register', checkNotAuthenticated, passport.authenticate('register', {
    successRedirect: '/profile',
    failureRedirect: '/register',
    failureFlash: true,
}));

module.exports = router;
