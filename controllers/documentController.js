const document_model=require('../models/documentModel');
const { validationResult} = require('express-validator');
const multer = require('multer');
const resolve= require('path').resolve;
const csv = require('csvtojson');


//file filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/csv') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

//set storage 
const storage = multer.diskStorage({
      destination: (req,file,cb)=> {
        cb(null, './public/uploads')
      },
      filename: function (req, file, cb) {
            cb(null, file.originalname);
      }
});
//upload file
const upload = multer({
      storage: storage,
      limits: { fileSize: 1000000 },
      fileFilter: fileFilter
}).single('file');



//import document data from csv file
const import_data= async(req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
      }
      try {
//file name is variable and can import any name csv file
   let csvFilePath = resolve(__dirname, `../public/uploads/${req.file.originalname}`);
      const csvData = await csv().fromFile(csvFilePath);

      //check if data is already present in database then delete it
      const data = await document_model.find();
      if (data.length > 0) {
            await document_model.deleteMany();
      }
      
      //insert data into database
       await document_model.insertMany(csvData);
      res.status(200).json({
            status: true,
            message: "Data imported successfully",
       });
 

     } catch (error) {
            res.status(500).json({
                  status: false,
                  message: "Error while importing datalll",
                  error: error.message
            });
      }
};
module.exports={upload,import_data}




