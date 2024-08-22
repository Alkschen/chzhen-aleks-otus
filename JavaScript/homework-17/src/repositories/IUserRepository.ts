import { IUser as User } from "../models/User";
export interface IUserRepository {
    findByUserId(user_id: number): Promise<User | undefined>;
    findByUsername(username: string): Promise<User | undefined>;
    findAllUsers(): Promise<User[]>;
    createUser(username: User): Promise<User>;
    updateUser(user: User): Promise<User | undefined>;
    deleteUser(user_id: number): Promise<boolean>;
}