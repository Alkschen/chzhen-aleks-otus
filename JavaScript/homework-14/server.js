const express = require('express');
const bodyParser = require('body-parser');
const createPath = require('./create-path');
const methodOverride = require('method-override')
const userRoute = require('./routes/user-routes');
const apiUserRoute = require('./routes/api/api-user-routes');
const apiProblemRoute = require('./routes/api/api-problem-routes');

// --- Создаем приложение
const app = express();

// --- Создание сервера
const HOST = 'localhost';
const PORT = 3000;
app.listen(PORT, HOST, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server run: http://${HOST}:${PORT}`)
    }
})

// --- Шаблонизатор
app.set('view engine', 'ejs');

// middlewares
app.use(methodOverride('_method'));
app.use(express.static('styles'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- Страницы

// --- Главная страница
app.get('/', (req, res) => {
    const title = 'Home';
    res
        .status(200)
        .render(createPath('index'), { title });
});

// --- Пользователи
app.use(userRoute);
app.use(apiUserRoute);
// app.get('/login', (req, res) => {
//     const title = 'Вход';
//     res.render(createPath('login'), { title });
// }); 

//  --- Задачи
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

app.get('/about', (req, res) => {
    const title = 'О проекте';
    res.render(createPath('about'), { title });
});
app.get('/contacts', (req, res) => {
    res.redirect('/about');
});
app.use((req, res) => {
    const title = 'Error Page';
    res
        .status(404)
        .render(createPath('error'), { title });
});
