require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(cors());

app.use(express.json());

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const query = await pool.query(
            'SELECT * FROM users WHERE username = $1 OR email = $1',
            [username]
        );

        if (query.rows.length === 0) {
            return res.status(401).json({ success: false, message: 'User not found.' });
        }

        const user = query.rows[0];

        // Compare submitted password with stored hash
        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (passwordMatch) {
            res.json({ success: true, message: 'Login successful'});
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials. Please try again.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


app.listen(8080, () => {
      console.log('server listening on port 8080')
})