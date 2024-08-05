const pool = require('../../config/pool-db')

const getUsers = (req, res) => {
    pool.query(`SELECT * FROM main.users ORDER BY user_id ASC`, (error, results) => {
        if (error) {
            return res.status(500).send("Ошибка при запросе пользователей");
        }
        res.status(200).json(results.rows)
    })
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }
    pool.query(`SELECT * FROM main.users WHERE user_id = $1`, [id], (error, results) => {
        if (error) {
            return res.status(500).send("Ошибка при запросе пользователей");
        }
        res.status(200).json(results.rows[0])
    })
};

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(`DELETE FROM main.users WHERE user_id = $1`, [id], (error, results) => {
        if (error) { throw error }
        res.status(200).send(`User deleted with ID: ${id}`)
    })
};

const createUser = (req, res) => {
    const { username, email, password } = req.body;
    const currentTime = new Date();
    pool.query('INSERT INTO main.users (username, email, password, created_at) VALUES ($1, $2, $3, $4) RETURNING user_id', [username, email, password, currentTime], (error, results) => {
        if (error) { 
            return res.status(500).send("Ошибка при добавлении пользователя");
        }
        res.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
};

const updateUser = (req, res) => {
    const { id, username, email } = req.body;
    pool.query('UPDATE main.users SET username = $1, email = $2 WHERE user_id = $3 RETURNING *', [username, email, id], (error, results) => {
        if (error) {
            return res.status(500).send("Ошибка при обновлении пользователя");
        }
        res.status(201).send(`User updated with ID: ${id}`);
    })
};

module.exports = {
    getUsers,
    getUserById,
    deleteUser,
    createUser,
    updateUser,
};