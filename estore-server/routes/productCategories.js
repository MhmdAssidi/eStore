const express = require('express');
const productCategories = express.Router();
const pool = require('../shared/pool');

productCategories.get('/', async (req, res) => {
  try {
    const [categories] = await pool.query('SELECT * FROM categories');
    res.status(200).send(categories);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send(err);
  }
});

module.exports = productCategories;