import * as dotenv from 'dotenv';
dotenv.config();
import app from './app';

const PORT: number = parseInt(process.env.PORT || '3000', 10);
const HOST: string = process.env.HOST || 'localhost';

// --- Создание сервера
app.listen(PORT, HOST, () => {
    console.log(`  App запущен: http://${HOST}:${PORT}`);
});
//# sourceMappingURL=server.js.map