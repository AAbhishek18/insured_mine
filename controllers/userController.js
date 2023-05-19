const userModel = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const validator = require('express-validator');
const dotenv = require('dotenv');
const node_mailer=require('nodemailer');
dotenv.config();

//create user registration 
exports.register = async(req, res) => {
      console.log(req.body)
      //return false
      // const errors = validator.validationResult(req);
      // if (!errors.isEmpty()) {
      //       return res.status(422).json({ errors: errors.array() });
      // }

     
            // const user =await userModel.findOne({email:req.body.email}); 
            // if(user){
            //       return res.status(400).json({message:"Email already exists"});
            // }

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password,salt);
            
            const newUser = new userModel({ 
                  firstname:req.body.firstname,
                  email:req.body.email,
                  password:hashPassword,
                 
            });  
            
        const savedUser = await newUser.save();
            console.log(savedUser)
           return res.status(200).json({
                  status:true,
                  message:"User created successfully",
                  data:savedUser
            });
      }
      



//controller user login 

exports.login = async(req, res) => {
      const errors = validator.validationResult(req);
      if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
      }

      try{
            //check if email exists
      let user=await userModel.findOne({email:req.body.email});
      if(!user){
            return res.status(400).json({message:"Email does not exists"});
      }
      //check password decrypt  and check if password is correct
      const validPass = await bcrypt.compare(req.body.password,user.password);
      if(!validPass){
            return res.status(400).json({message:"Invalid password"});
      }
      //create and assign a token
      const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
      res.header('auth-token',token).json({status:true,message:"Login successfully",token:token});
      }catch(err){
            return res.status(500).json({
                  status:false,
                  message:"Something went wrong"});
      }
}

//GET USER BY ID

exports.getUserById = async(req, res) => {
      try{
            const user = await userModel.findById(req.params.id);
            console.log(user)
            if(!user){
                  return res.status(400).json({
                        status:false,
                        message:"User not found"});
            }

            res.status(200).json({
                  status:true,
                  message:"User found",
                  user:user
            });
      }catch(err){
            return res.status(500).json({
                  status:false ,
                  message:"Something went wrong"});
      }
}




//Get all users

exports.getAllUsers = async(req, res) => {
      try{
            const users = await userModel.find({});
            res.status(200).json({
                  status:true,
                  message:"All users",users:users});
      }catch(err){
            return res.status(500).json({
                 status:false ,
                  message:"Something went wrong"});
      }
}

//update user

exports.updateUser = async(req, res) => {
      try{
            const user = await userModel.findById(req.params.id);
            //console.log(user)
            if(!user){
                  return res.status(400).json({
                        status:false,
                        message:"User not found"});
            }
           
            user.firstname=req.body.firstname;
            user.email=req.body.email;
            user.phone=req.body.phone;
            user.password=req.body.password;
           

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password,salt);
            user.password=hashPassword;
           

            //update user
          let  userUpdated = await userModel.findByIdAndUpdate(req.params.id,user,{new:true});
            res.status(200).json({
                  status:true,
                  message:"User updated successfully",
                  user:userUpdated
            });
      }catch(err){
            return res.status(500).json({
                  status:false ,
                  message:"Something went wrong"});
            }


 }

 //delete user

      exports.deleteUser = async(req, res) => {
            try{
                  const user = await userModel.findById(req.params.id);
                  if(!user){
                        return res.status(400).json({
                              status:false,
                              message:"User not found"});
                  }
                  //delete user
                  await userModel.findByIdAndDelete(req.params.id);
                  res.status(200).json({
                        status:true,
                        message:"User deleted successfully",
                        user:user
                  });
            }catch(err){
                  return res.status(500).json({
                        status:false ,
                        message:"Something went wrong"});
                  }
      }
    





      
      






          
