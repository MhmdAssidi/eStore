const express = require('express');
const products = express.Router();
const pool = require('../shared/pool');

products.get('/', async (req, res) => {
  try {
    const mainCategoryId = req.query.maincategoryid;
    const subCategoryId = req.query.subcategoryid;
    const keywords = req.query.keywords;

    let query = 'SELECT products.* FROM products';
    const queryParams = [];

    if (mainCategoryId) {
      query += ' JOIN categories ON products.category_id = categories.id';
      query += ' WHERE categories.parent_category_id = ?';
      queryParams.push(mainCategoryId);

      if (keywords) {
        query += ' AND keywords LIKE ?';
        queryParams.push(`%${keywords}%`);
      }
    } else if (subCategoryId) {
      query += ' WHERE products.category_id = ?';
      queryParams.push(subCategoryId);
    }

    const [productsData] = await pool.query(query, queryParams);
    res.status(200).send(productsData);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send(err);
  }
});

products.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const [product] = await pool.query(
      'SELECT * FROM products WHERE id = ?',
      [productId]
    );

    res.status(200).send(product);
  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).send('Error fetching product');
  }
});

module.exports = products;