const jwt=require('jsonwebtoken');

const checkToken=(req,res,next)=>{
    try{
        const token=req.headers.authorization;

        if(!token){
            return res.status(401).json({message:'Unauthorized'});
        }
  jwt.verify(token,"estore_secret_key");
//  jwt.verify(token, key) =
//Was this token securely created using this key, and is it still valid?
        next();
           
        
    }
    catch(err){
        console.error(err);
        res.status(401).json({message:'Unauthorized'});
    }
}
module.exports = checkToken;