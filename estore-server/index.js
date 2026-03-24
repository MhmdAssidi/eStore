const express=require('express');
const cors = require('cors');
const productCategories = require('./routes/productCategories');
const app= express();
const PORT=5001;
const products=require('./routes/products');
app.use(cors());
app.use("/productCategories",productCategories);
app.use("/products",products);
const server=app.listen(PORT,()=>{
       console.log(`Server is running on port ${PORT}`);
})
