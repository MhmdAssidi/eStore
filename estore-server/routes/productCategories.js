const express=require('express');
const productCategories= express.Router();
const pool=require('../shared/pool');

productCategories.get('/',(req,res)=>{
   
    pool.query('SELECT * FROM categories',(err,categories)=>{
       if(err){
           console.error('Error executing query:', err);
          res.status(500).send(err);
          return;
            }
        else{
                res.status(200).send(categories);
         }
        });

    });  

    module.exports=productCategories;

