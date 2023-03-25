//create policy controller

const policyModel = require('../models/policyModel');
const userModel = require('../models/userModels');
const validator = require('express-validator');
const dotenv = require('dotenv');

//api to create policy
exports.createPolicy = async(req, res) => {
      try{
            const errors = validator.validationResult(req);
            if (!errors.isEmpty()) {
                  return res.status(422).json({ errors: errors.array() });
            }
            //plis check if user exists
       let policy=await policyModel.findOne({policy_number:req.body.policy_number});
            if(policy){
                  return res.status(400).json({message:"Policy already exists"});
            }
            const newPolicy = new policyModel({ 
                  policy_number:req.body.policy_number,
                  policy_mode:req.body.policy_mode,
                  premium_amount:req.body.premium_amount,
                  premium_amount_written:req.body.premium_amount_written,
                  policy_type:req.body.policy_type,
                  policy_start_date:req.body.policy_start_date,
                  policy_end_date:req.body.policy_end_date,
            });
            const savedPolicy = await newPolicy.save();
            res.status(200).json({statu:true,message:"Policy created successfully",policy:savedPolicy});


      }catch(err){
            return res.status(500).json({
            message:"Something went wrong",
            error:err
      });
      }
}

//api to update policy
exports.updatePolicy = async(req, res) => {
      try{
            const errors = validator.validationResult(req);
            if (!errors.isEmpty()) {
                  return res.status(422).json({ errors: errors.array() });
            }
            //check if policy exists
            let policy=await policyModel.findOne({_id:req.params.id});
            if(!policy){
                  return res.status(400).json({message:"Policy does not exist"});
            }
            
            //update policy details
            policy.policy_mode=req.body.policy_mode,
            policy.policy_type=req.body.policy_type,
            policy.policy_start_date=req.body.policy_start_date,
            policy.policy_end_date=req.body.policy_end_date,
            console.log(policy)
            const savedPolicy = await policyModel.findByIdAndUpdate({_id:req.params.id},policy,{new:true});
            console.log(savedPolicy)
            res.status(200).json({
                  statu:true,
                  message:"Policy updated successfully",
                  policy:savedPolicy
            });

}catch(err){
            return res.status(500).json({
            message:"Something went wrong",
            error:err
      });
      }

}

//api to get policy
exports.getPolicy = async(req, res) => {
      try{
            //check if policy exists
            let isPolicyExist=await policyModel.findOne({policy_number:req.body.policy_number});
            console.log(isPolicyExist);
            if(!isPolicyExist){
                  return res.status(400).json({message:"Policy does not exist"});
            }
      //get policy
      const policy = await policyModel.findOne({policy_number:req.body.policy_number});
      res.status(200).json({
            statu:true,
            message:"Policy fetched successfully",
            policy:policy
      });

}catch(err){
            return res.status(500).json({
            message:"Something went wrong",
            error:err
      });
}

}

//api to get all policies
exports.getAllPolicies = async(req, res) => {
      try{
            //get all policies
            const policies = await policyModel.find();
            res.status(200).json({
                  statu:true,
                  message:"Policies fetched successfully",
                  policies:policies
            });

      }catch(err){
            return res.status(500).json({
            message:"Something went wrong",
            error:err
      });
      }

}





//api to delete policy
exports.deletePolicy = async(req, res) => {
            try{
                  //check if policy exists
                  let isPolicyExist=await policyModel.findById({ _id: req.params.id});
                  if(!isPolicyExist){
                        return res.status(400).json({message:"Policy does not exist"});
                  }
                  const deletedPolicy = await policyModel.deleteOne({ _id: req.params.id});
                  res.status(200).json({
                        statu:true,
                        message:"Policy deleted successfully",
                        policy:deletedPolicy
                  });

      }catch(err){
                  return res.status(500).json({
                  message:"Something went wrong",
                  error:err
            });

      }

}





