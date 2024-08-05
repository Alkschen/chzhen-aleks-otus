require('dotenv').config();

// --- Подключение модулей
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

// --- Создаем приложение
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// --- Подключение файлов и маршрутов
const createPath = require('./helpers/create-path');

const authRoute = require('./routes/auth-route');
const indexRoute = require('./routes/index-route');
const apiUserRoute = require('./routes/api/api-user-routes');
const apiProblemRoute = require('./routes/api/api-problem-routes');

// --- Шаблонизатор
app.set('view engine', 'ejs');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use(express.static('styles'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- Маршруты
app.use('/', indexRoute);
app.use('/', authRoute);

// --- API
app.use(apiUserRoute);
app.use(apiProblemRoute);

// --- Обсуждения
// app.get('/discussions', (req, res) => {
//     const title = 'Осуждения';
//     let discussions = [{}],
//     };
//     res.render(createPath('discussion'), { title, discussion })
// }); 
// app.post('/new-discussion', (req, res) => {
//     const { title, author, text } = req.body;
//     let discussion = {
//         id: new Date(),
//         date: (new Date()).toLocaleDateString(),
//         author,
//         title,
//         status: 'open',
//         text,
//         comments: []
//     }
//     res.render(createPath('discussion'), { title, discussion });
// });
// app.get('/new-discussion', (req, res) => {
//     const title = 'Создание нового осуждения';
//     res.render(createPath('new-discussion'), { title });
// });

app.use((req, res) => {
    const title = 'Error Page';
    res
        .status(404)
        .render(createPath('error'), { title });
});

// --- Создание сервера
app.listen(PORT, HOST, (error) => {
    if (error) { console.log(error);
    } else { console.log(`Server run: http://${HOST}:${PORT}`)
}
});