const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const pool = require('./pool-db');

const getUserByUsername = async (username) => {
  // console.log(`Querying the database for user with username: ${username}`);
  const user = await pool.query(`SELECT * FROM main.users WHERE username = $1`, [username]);
  // console.log(`Query result: ${JSON.stringify(user.rows)}`);
  return user.rows[0];
};

const getUserById = async (id) => {
  const user = await pool.query(`SELECT * FROM main.users WHERE user_id = $1`, [id]);
  return user.rows[0];
};

const createUser = async (username, email, password) => {
  const currentTime = new Date();
  const user = await pool.query(`INSERT INTO main.users (username, email, password, created_at) VALUES ($1, $2, $3, $4) RETURNING user_id`, [username, email, password, currentTime]);
  return user.rows[0];
};

function initialize(passport) {
  // Функция для аутентификации пользователя
  const authenticateUser = async (req, username, password, done) => {
    const user = await getUserByUsername(username);
    if (!user) {
      return done(null, false, { message: 'Неверное имя пользователя или пароль' });
    };
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Неверное имя пользователя или пароль' });
      }
    } catch (error) {
      return done(error);
    };
  };
  // Функция для регистрации пользователя
  const registerUser = async (req, username, password, done) => {
    // console.log('Registerng user:', { req, username, email, password });
    const { email } = req.body;
    console.log('email:', email);
    const checkUser = await getUserByUsername(username);
    if (checkUser) {
      return done(null, false, { message: 'Пользователь с таким именем уже существует' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(username, email, hashedPassword);
    console.log('New user:', newUser)
    return done(null, newUser);;
  };

  passport.use('login', new LocalStrategy({ passReqToCallback: true }, authenticateUser));
  passport.use('register', new LocalStrategy({ 
    usernameField: 'username', 
    emailField: 'email',
    passwordField: 'password', 
    passReqToCallback: true 
  }, registerUser));
  passport.serializeUser((user, done) => done(null, user.user_id, user.username));
  passport.deserializeUser(async (id, done) => {
    const user = await getUserById(id);
    if (!user) {
      return done(null, false, { message: 'Пользователь не найден' });
    };
    done(null, user);
  });
};

module.exports = initialize;