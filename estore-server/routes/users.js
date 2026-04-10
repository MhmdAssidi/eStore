const express = require('express');
const pool = require('../shared/pool');
const user = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
user.post('/signup', async (req, res) => {

    const {firstname, lastname, address,city,state,pin,email,password} = req.body;
    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (firstname, lastname, address, city, state, pin, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [firstname, lastname, address, city, state, pin, email, hashedPassword]);
    res.status(201).json({ message: 'User registered successfully' });

});

user.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const [user] = await pool.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length === 0) {
        return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
        { userId: user[0].id, email: user[0].email },
        "estore_secret_key",
        { expiresIn: '1h' }
    );
    res.status(200).json({ token,expiresInSeconds:3600, message: 'Login successful' });

});
module.exports = user;
