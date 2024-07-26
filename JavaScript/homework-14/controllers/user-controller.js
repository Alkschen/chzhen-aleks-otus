// const handleError = (res, error) => {
//     console.log(error);
//     res.render(createPath('error'), { title: 'Error' });
// };

const pool = require('../pool-db')
const createPath = require('../create-path');

const getUsers = (req, res) => {
    const title = 'Пользователи';
    pool.query(`SELECT * FROM main.users ORDER BY user_id ASC`, (error, results) => {
        if (error) {
            return res.status(500).send("Ошибка при запросе пользователей");
        }
        res
            .status(200)
            .render(createPath('users/users'), { title, users: results.rows });
    })
};

const getUserById = (req, res) => {
    const title = 'Пользователь';
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }
    pool.query(`SELECT * FROM main.users WHERE user_id = $1`, [id], (error, results) => {
        if (error) {
            return res.status(500).send("Ошибка при запросе пользователей");
        }
        res
            .status(200)
            .render(createPath('users/user'), { title, users: results.rows[0] });
    })
};

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(`DELETE FROM main.users WHERE user_id = $1`, [id], (error, results) => {
        if (error) { throw error }
        res.status(200).send(`User deleted with ID: ${id}`)
    })
};

const registerForm = (req, res) => { 
    const title = 'Регистрация';
    res.render(createPath('users/register'), { title });
};

const createUser = (req, res) => {
    const { username, email, password } = req.body;
    const currentTime = new Date();
    pool.query('INSERT INTO main.users (username, email, password, created_at) VALUES ($1, $2, $3, $4) RETURNING user_id', [username, email, password, currentTime], (error, results) => {
        if (error) { 
            return res.status(500).send("Ошибка при добавлении пользователя");
        }
        res
            .status(201)
            .redirect(`/users/${results.rows[0].user_id}`);
    })
};

const editUserForm = (req, res) => { 
    const title = 'Редактирование';
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }
    pool.query(`SELECT * FROM main.users WHERE user_id = $1`, [id], (error, results) => {
        if (error) {
            return res.status(500).send("Ошибка при запросе пользователей");
        }
        res.status(200).render(createPath('users/edit'), { title, users: results.rows[0] });
    })
};

const updateUser = (req, res) => {
    // console.log('updateUser function called:', req.params, req.body);
    const id = parseInt(req.params.id);
    const { username, email } = req.body;
    pool.query('UPDATE main.users SET username = $1, email = $2 WHERE user_id = $3 RETURNING *', [username, email, id], (error, results) => {
        if (error) {
            // console.log('Error in updateUser:', error);
            return res.status(500).send("Ошибка при обновлении пользователя");
        }
        // console.log('Update user query results:', results);
        res.status(201).redirect(`/users/${id}`);
    })
};

module.exports = {
    getUsers,
    getUserById,
    registerForm,
    createUser,
    editUserForm,
    updateUser,
    deleteUser,
};