const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const mongoose = require("mongoose");

const User = require("../models/userModel");


// @disc register the user
// @api post /api/users/register
// @ acess public
  
const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username|| !email|| !password){
        res.status(400);
        throw new Error("All fields are manadatory");
    }
    const userAvailable = await User.findOne({email});
    // console.log(userAvailable)
    if(userAvailable){
        res.status(400);
        throw new Error("user already register");
    }
    const hashedPassword = await bcrypt.hash(password,10);

    console.log(hashedPassword);
    const user = await User.create({
        username,
        email,
        password:hashedPassword,
    });
    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({_id:user.id,email:user.email});
    }else{
        res.status(400);
        throw new Error("User data us not valid")
    }

    res.json({message:"Register the user"})
});

// @disc login the user
// @api post /api/users/login
// @ acess public
  
const loginUser = asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email|| !password){
        res.status(400);
        throw new Error("all fields are manadatory");
    }
    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password,user.password))){
             const accessToken= jwt.sign({
                user:{
                username:user.username,
                email:user.email,
                id:user.id,
                },
             },process.env.ACCES_TOKEN_SECRET,
             {expiresIn:"1m"}
             
             );
            res.status(200).json({accessToken});
    }
     else {
        res.status(401);
        throw new Error("Email and password is not valid")
     }        
      
    
   
});
// @disc current  user info
// @api post /api/users/current
// @ acess private
  
const currentUser = asyncHandler(async(req,res)=>{
    res.json(res.user)
});



module.exports = {registerUser,loginUser,currentUser}