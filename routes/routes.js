

const router =require('express').Router();
const user_controller=require('../controllers/userController');
const policy_controller=require('../controllers/policyController');
const document_controller=require('../controllers/documentController');
const account_controller=require('../controllers/accountController');

//user registration reoute
router.post('/register',user_controller.register);
//user login route
router.get('/login',user_controller.login);
//get user by id route
router.get('/user/:id',user_controller.getUserById);
//get all users route
router.get('/users',user_controller.getAllUsers);
//update user route
router.put('/user/:id',user_controller.updateUser);
//delete user route
router.delete('/user_delete/:id',user_controller.deleteUser);


//create policy route
router.post('/policy',policy_controller.createPolicy);
//update policy route
router.put('/policy_update/:id',policy_controller.updatePolicy);
//get policy by id route
router.get('/policy_by_number',policy_controller.getPolicy);
//get all policies route
router.get('/policies',policy_controller.getAllPolicies);
//delete policy route
router.delete('/policy_delete/:id',policy_controller.deletePolicy);


//importing document route
router.post('/import_document',document_controller.upload,document_controller.import_data);


//creater account route
router.post('/create_account',account_controller.createAccount);
//update account route
router.put('/update_account/:id',account_controller.updateAccount);
//get account by id route
router.get('/account_by_id/:id',account_controller.getAccountById);
//get all accounts route
router.get('/all_accounts',account_controller.getAllAccounts);
//delete account route
router.delete('/delete_account/:id',account_controller.deleteAccount);





module.exports = router;