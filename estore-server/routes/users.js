const express = require('express');
const pool = require('../shared/pool');
const userRouter = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
userRouter.post('/signup', async (req, res) => {

    const {firstname, lastname, address,city,state,pin,email,password} = req.body;
    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (firstName, lastName, address, city, state, pin, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [firstname, lastname, address, city, state, pin, email, hashedPassword]);
    res.status(201).json({ message: 'User registered successfully' });

});

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
        return res.status(400).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, users[0].password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
        { userId: users[0].id, email: users[0].email },
        "estore_secret_key",
        { expiresIn: '1h' }
    );
    res.status(200).json({ 
        token: token,
        user:{
            firstname: users[0].firstName,
            lastname: users[0].lastName,
            address: users[0].address,
            city: users[0].city,
            state: users[0].state,
            pin: users[0].pin,
            email: users[0].email
        },
        expiresInSeconds:3600,
        message: 'Login successful' });

});
module.exports = userRouter;
