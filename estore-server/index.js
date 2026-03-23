const express=require('express');
const cors = require('cors');
const productCategories = require('./routes/productCategories');
const app= express();
const PORT=5001;

app.use(cors());
app.use("/productCategories",productCategories);
const server=app.listen(PORT,()=>{
       console.log(`Server is running on port ${PORT}`);
})
