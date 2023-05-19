const accountModel = require('../models/accountModel');
const policyModel = require('../models/policyModel');
const userModel = require('../models/userModels');
const validator = require('express-validator');

//api to create ACCOUNT
exports.createAccount = async (req, res) => {
      try {
            const errors = validator.validationResult(req);
            if (!errors.isEmpty()) {
                  return res.status(422).json({ errors: errors.array() });
            }
            //check if user exists
            
            const newAccount = new accountModel({
                  agent: req.body.agent,
                  producer: req.body.producer,
                  company_name: req.body.company_name,
                  category_name: req.body.category_name,
                  csr: req.body.csr,
                  account_name: req.body.account_name,
                  account_type: req.body.account_type,
            });
            const savedAccount = await newAccount.save();
            res.status(200).json({
                  statu: true,
                  message: "Account created successfully",
                  account: savedAccount
            });
      } catch (err) {
            return res.status(500).json({
                  message: "Something went wrong",
                  error: err
            });
      }
}

//api to update ACCOUNT
exports.updateAccount = async (req, res) => {
      try {
            const errors = validator.validationResult(req);
            if (!errors.isEmpty()) {
                  return res.status(422).json({ errors: errors.array() });
            }
            //check if account exists
            let account = await accountModel.findOne({ _id: req.params.id });
            if (!account) {
                  return res.status(400).json({ message: "Account does not exist" });
            }
            //update account details
                  account.agent = req.body.agent,
                  account.producer = req.body.producer,
                  account.company_name = req.body.company_name,
                  account.category_name = req.body.category_name,
                  account.csr = req.body.csr,
                  account.account_name = req.body.account_name,
                  account.account_type = req.body.account_type,
                  console.log(account)
            const savedAccount = await accountModel.findByIdAndUpdate({ _id: req.params.id }, account, { new: true });
            console.log(savedAccount)
            res.status(200).json({
                  statu: true,
                  message: "Account updated successfully",
                  account: savedAccount
            });
      } catch (err) {
            return res.status(500).json({
                  message: "Something went wrong",
                  error: err
            });
      }
}

//api to get all accounts
exports.getAllAccounts = async (req, res) => {
      try {
            const accounts = await accountModel.find();
            res.status(200).json({
                  statu: true,
                  message: "Accounts fetched successfully",
                  accounts: accounts
            });
      } catch (err) {
            return res.status(500).json({
                  message: "Something went wrong",
                  error: err
            });
      }
}

//api to get account by id
exports.getAccountById = async (req, res) => {
      try {
            const account = await accountModel.findOne({ _id: req.params.id });
            res.status(200).json({
                  statu: true,
                  message: "Account fetched successfully",
                  account: account
            });
      } catch (err) {
            return res.status(500).json({
                  message: "Something went wrong",
                  error: err
            });
      }
}

//api to delete account by id
exports.deleteAccount = async (req, res) => {
      try {
            const account = await accountModel.findOne({ _id: req.params.id });
            if (!account) {
                  return res.status(400).json({ message: "Account does not exist" });
            }
            const deletedAccount = await accountModel.findByIdAndDelete({ _id: req.params.id });
            res.status(200).json({
                  statu: true,
                  message: "Account deleted successfully",
                  account: deletedAccount
            });
      } catch (err) {
            return res.status(500).json({
                  message: "Something went wrong",
                  error: err
            });
      }
}

