const express=require('express');
const mysql=require('mysql2');
const productCategories= express.Router();

const pool=mysql.createPool({
host:'localhost',
user:"root",
password:"",
database:"estore",
port:3307,
multipleStatements:true
});
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

