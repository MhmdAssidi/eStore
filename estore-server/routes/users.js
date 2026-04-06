const express = require('express');
const pool = require('../shared/pool');
const user = express.Router();
const bcrypt = require('bcryptjs');

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

module.exports = user;
