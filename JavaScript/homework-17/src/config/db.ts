import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

if (!process.env.PG_USER || !process.env.PG_PASSWORD || !process.env.PG_DATABASE || !process.env.PG_PORT) {
    throw new Error('Отсутствуют переменные окружения: PG_USER, PG_PASSWORD, PG_DATABASE, PG_PORT');
}

interface Config {
    host: string;
    user: string;
    password: string;
    database: string;
    port: number;
}

const config: Config = {
    host: process.env.PG_HOST || 'localhost',
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: parseInt(process.env.PG_PORT, 10) 
};

export default new Pool(config);