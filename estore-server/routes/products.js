const express=require('express');
const products=express.Router();
const pool=require('../shared/pool');

products.get('/', (req, res) => {
  const mainCategoryId = req.query.maincategoryid;
  const subCategoryId = req.query.subcategoryid;
  const keywords= req.query.keywords;
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
}
  
  else if (subCategoryId) {
    query += ' WHERE products.category_id = ?';
    queryParams.push(subCategoryId);
  }

  pool.query(query, queryParams, (err, products) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send(err);
      return;
    }

    res.status(200).send(products);
  });
});

    products.get('/:id',(req,res)=>{
        const productId=req.params.id;
        pool.query('SELECT * FROM products WHERE id=?',[productId],(err,product)=>{
           if(err){
               console.error('Error executing query:', err);
               res.status(500).send('Error fetching product');
           }
           else{
               res.status(200).send(product);
           }
        });
    });

    module.exports=products;

