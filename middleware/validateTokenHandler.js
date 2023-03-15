const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");


const validateToken = asyncHandler(async(req,res,next)=>{
    let token;
    let authheader = req.headers.authorization || req.headers.Authorization;
    if(authheader && authheader.startsWith("Bearer")){
        token = authheader.split(" ")[1];
        jwt(token,process.env.ACCESS_TOKEN_SECRET,(error,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User is not authorized")
            }
           req.user = decoded.user;
           next();
        });
        if (!token){
            res.status(401);
            throw new Error("user is not authirized or user is missing token")
        }
    };

});


module.exports = validateToken