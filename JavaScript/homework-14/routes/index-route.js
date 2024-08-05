const express = require('express');
const router = express.Router();

const createPath = require('../helpers/create-path');
const { checkAuthenticated } = require('../helpers/auth');

router.get('/', checkAuthenticated, (req, res) => {
    const title = 'Home';
    res
        .status(200)
        .render(createPath('index'), { title, users: req.user });
});
router.get('/about', checkAuthenticated, (req, res) => {
    const title = 'О проекте';
    res.render(createPath('about'), { title, users: req.user });
});
router.get('/contacts', (req, res) => {
    res.redirect('/about');
});

module.exports = router