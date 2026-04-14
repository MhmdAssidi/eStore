const express=require('express');
const cors = require('cors');
const productCategories = require('./routes/productCategories');
const app= express();
const PORT=5001;
const products=require('./routes/products');
const user=require('./routes/users');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const orders=require('./routes/orders');

app.use(cors());
app.use("/productCategories",productCategories);
app.use("/products",products);
app.use("/users",user);
app.use("/orders",orders);
const server=app.listen(PORT,()=>{
       console.log(`Server is running on port ${PORT}`);
})
