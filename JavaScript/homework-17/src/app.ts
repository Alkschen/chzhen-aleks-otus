import * as dotenv from 'dotenv';
dotenv.config();

// --- Подключение модулей
import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import passport from 'passport';
import flash from 'express-flash';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import path from 'path';

// --- Подключение файлов и маршрутов
import indexRoute from './routes/indexRoutes';
import userRoute from './routes/userRoutes';
import apiUserRoute from './routes/api/apiUserRoutes';
// import apiProblemRoute from './routes/api/api-problem-routes';

// --- Создаем приложение
const app = express();

// --- Express Конфигурация приложения
// app.set('port', process.env.PORT || 3000);
app.set('views', path.resolve(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const sessionSecret = process.env.SESSION_SECRET;
if (typeof sessionSecret !== 'string') {
    throw new Error('SESSION_SECRET must be set');
}
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(methodOverride('_method'));
app.use(express.static(path.resolve(__dirname, '../styles')));

// --- Маршруты
app.use('/', indexRoute);
app.use('/', userRoute);
// --- API маршруты
app.use('/api', apiUserRoute);
// app.use('/api', apiProblemRoute);
app.use((req: Request, res: Response) => {
    const title = 'Error Page';
    res
        .status(404)
        .render('error', { title });
});

export default app;