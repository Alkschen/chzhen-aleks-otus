import { IUserRepository } from "./IUserRepository";
import { IUser as User } from "../models/User";
import pool from "../config/db";
import bcrypt from "bcrypt";

export class UserRepository implements IUserRepository {
    async findByUserId(id: number): Promise<User | undefined> {
        // console.log('findByUserId:', id);
        const user = await pool.query(`SELECT * FROM main.users WHERE user_id = $1`, [id]);
        return user.rows[0] || null;
    }
    async findByUsername(username: string): Promise<User | undefined> {
        // console.log('findByUsername:', username);
        const user = await pool.query(`SELECT * FROM main.users WHERE username = $1`, [username]);
        return user.rows[0] || null;
    }
    async findAllUsers(): Promise<User[]> {
        const users = await pool.query(`SELECT * FROM main.users ORDER BY user_id ASC`);
        return users.rows;
    }
    async createUser(user: User): Promise<User> {
        const currentTime = new Date();
        const newUser = await pool.query(`INSERT INTO main.users (username, email, password, created_at) VALUES ($1, $2, $3, $4) RETURNING user_id`, [user.username, user.email, user.password, currentTime]);
        return newUser.rows[0];
    }
    async updateUser(user: User): Promise<User | undefined> {
        const updatedUser = await pool.query(`UPDATE main.users SET username = $1, email = $2 WHERE user_id = $3 RETURNING *`, [user.username, user.email, user.user_id]);
        return updatedUser.rows[0] || null;
    }

    async deleteUser(id: number): Promise<boolean> {
        pool.query(`DELETE FROM main.users WHERE user_id = $1`, [id]);
        return true;
    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}