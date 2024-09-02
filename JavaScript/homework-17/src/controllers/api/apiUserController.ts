import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../../repositories/userRepository';
import "../../config/passport";

const userRepository = new UserRepository();

class ApiUserController {
    async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await userRepository.findAllUsers();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).send("Ошибка при получении пользователей");
        }
    };
    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ error: 'Invalid user ID' });
            }
            const checkUser = await userRepository.findByUserId(id);
            if (!checkUser) {
                res.status(404).json({ error: 'User not found' });
            };
            res.status(200).json(checkUser);
        } catch (err) {
            res.status(500).send("Ошибка при запросе пользователя");
        }
    };
    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ error: 'Invalid user ID' });
            }
            const checkUser = await userRepository.findByUserId(id);
            if (!checkUser) {
                res.status(404).json({ error: 'User not found' });
            };
            await userRepository.deleteUser(id);
            res.status(200).send(`Удален пользователь с ID: ${id}`);
        } catch (err) {
            res.status(500).send("Ошибка при удалении пользователя");
        }
    };
    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                res.status(400).send("Не все поля заполнены");
            }
            const checkUser = await userRepository.findByUsername(req.body.username);
            if (checkUser) {
                res.status(400).send("Пользователь с таким именем уже существует");
            }
            const hashedPassword = await userRepository.hashPassword(password);
            const user = { 
                username, 
                email, 
                password: hashedPassword
            };
            const newUser = await userRepository.createUser(user);
            res.status(201).json(newUser);
        } catch (err) {
            res.status(500).send("Ошибка при создании пользователя");
        }
    };
    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                res.status(400).json({ error: 'Invalid user ID' });
            }
            const checkUser = await userRepository.findByUserId(id);
            if (!checkUser) {
                res.status(404).json({ error: 'User not found' });
            };
            const { username, email } = req.body;
            const user = {user_id: id, username, email};
            const updatedUser = await userRepository.updateUser(user);
            res.status(201).json(updatedUser);
        } catch (err) {
            res.status(500).send("Ошибка при обновлении пользователя");
        }
    };
};

export default new ApiUserController();