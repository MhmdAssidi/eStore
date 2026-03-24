const mysql=require('mysql2');

const pool=mysql.createPool({
host:'localhost',
user:"root",
password:"",
database:"estore",
port:3307,
multipleStatements:true
});

module.exports=pool;