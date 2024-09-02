import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { IUser as User } from '../models/User';
import { UserRepository } from '../repositories/userRepository';

const userRepository = new UserRepository();

// Функция для аутентификации пользователя
const authenticateUser = async (req: any, username: string, password: string, done: any) => {
  try {
    const user: User | undefined = await userRepository.findByUsername(username);
    if (!user) {
      return done(undefined, false, { message: 'Неверное имя пользователя или пароль' });
    };
    if (user.password === undefined) {
      return done(undefined, false, { message: 'Неверное имя пользователя или пароль' });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return done(undefined, false, { message: 'Неверное имя пользователя или пароль' });
    };
    return done(null, user);
  } catch (error) {
    return done(error);
  };
}

passport.use(new LocalStrategy({ passReqToCallback: true }, authenticateUser));

passport.serializeUser<any, any>((user: User, done: any) => {
  // console.log('Serialize user:', user);
  done(undefined, user.user_id);
})

passport.deserializeUser(async (id: number, done: any) => {
  try {
    // console.log('Deserialize user:', id);
    const user: User | undefined = await userRepository.findByUserId(id);
    if (!user) {
      return done(undefined, false, { message: 'Пользователь не найден' });
    };
    return done(undefined, user);
  } catch (error) {
    return done(error);
  };
});