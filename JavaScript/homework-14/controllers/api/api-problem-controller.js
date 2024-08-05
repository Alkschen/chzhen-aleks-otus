const pool = require('../../config/pool-db')

// Функция обработки ошибки
const handleError = (res, error, message) => {
    console.error(message, error);
    res.status(500).json({ error: message });
};

// Проверка ID
const validateId = (req, res, message) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: message });
    }
    return id;
};

const getLanguages = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM main.language ORDER BY language_id ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        handleError(res, error, "Не удалось получить языки программирования");
    }
};

// Задачи
const getProblems = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM main.problems ORDER BY problems_id ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        handleError(res, error, "Не удалось получить задачи");
    }
};

const getProblemById = async (req, res) => {
    const id = parseInt(req.params.id);
    validateId(req, res, 'Invalid problem ID');
    try {
        const result = await pool.query('SELECT * FROM main.problems WHERE problems_id = $1', [id]);
        const problem = result.rows[0];
        if (!problem) {
            return res.status(404).json({ error: 'Задача не найдена' });
        } else {    
            res.status(200).json(problem);
        }
    } catch (error) {
        handleError(res, error, "Не удалось получить задачу");
    }
};

const deleteProblem = async (req, res) => { const id = parseInt(req.params.id);
    validateId(req, res, 'Invalid problem ID');
    try {
        const result = await pool.query('DELETE FROM main.problems WHERE problems_id = $1', [id]);
        res.status(200).json({ message: `Задача ${id} удалена` });
    } catch (error) {
        handleError(res, error, "Не удалось удалить задачу");
    }
};

const addProblem = async (req, res) => {
    const { title, description, difficulty, tags, languge_id, } = req.body;
    const currentTime = new Date();
    try {
        const result = await pool.query('INSERT INTO main.problems (title, description, difficulty, tags, languge_id, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', 
            [title, description, difficulty, tags, languge_id, currentTime]);
        res.status(201).send(`Добавлена задача ID: ${result.rows[0].id}`);
    } catch (error) {
        handleError(res, error, "Не удалось создать задачу");
    }
};

const editProblem = async (req, res) => {
    const { id, title, description, difficulty, tags, languge_id, } = req.body;
    try {
        const result = await pool.query('UPDATE main.problems SET title = $1, description = $2, difficulty = $3, tags = $4, languge_id = $5 WHERE problems_id = $6 RETURNING *', 
            [title, description, difficulty, tags, languge_id, id]);
        res.status(201).send(`Задача ${id} обновлена`);
    } catch (error) {
        handleError(res, error, "Не удалось обновить задачу");
    }
};

module.exports = {
    getLanguages,
    getProblems,
    getProblemById,
    deleteProblem,
    addProblem,
    editProblem,
};