const express=require('express');
const pool = require('../shared/pool.js');
const orders=express.Router();
const sharedToken=require('../shared/sharedToken.js')
orders.post('/add',sharedToken,async (req,res)=>{
const {
    userName,
    userEmail,
    address,
    city,
    state,
    pin,
    total,
    orderDetails,
}=req.body;
try{

 const [users]=await pool.promise().query('SELECT id FROM users WHERE email=?',[userEmail]);
    if(users.length===0){
        return res.status(400).json({message:'User not found'});
    }

    const userId=users[0].id;
    const [orderResult]=await pool.promise().query('INSERT INTO orders (userId, userName, address, city, state, pin, total) VALUES (?, ?, ?, ?, ?, ?, ?)',[userId,userName,address,city,state,pin,total]);

    const orderId=orderResult.insertId;

    //insert order details
    //the order maybe many products,so we will use map function to loop through every item in orderDetails array and insert into order_details table
    const orderDetailsValues=orderDetails.map(item=>[orderId,item.productId,item.quantity,item.price,item.amount]);
    await pool.promise().query('INSERT INTO orderdetails (orderId, productId, quantity, price, amount) VALUES ?',[orderDetailsValues]);

    res.status(200).json({message:'Order placed successfully'});
}catch(err){
    console.error(err);
    res.status(500).json({message:'Internal server error'});
}
});

module.exports=orders;