const multer = require("multer");
const path = require("path")
const crypto = require("crypto");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images')
    },
    filename: (req, file, cb) => {
        cb(null, `${crypto.randomBytes(10).toString("hex")}-${file.originalname}`);
    }
});
  
    const upload = multer({ 
            storage: storage,
              fileFilter: function (req, file, callback) {
                    var ext = path.extname(file.originalname);
                    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                    const err =  new Error('Only images are allowed');
                    err.code = "INCCORECT_FILE_TYPE";
                    return callback(err, false);
                    }
                    callback(null, true)
                },

            limits:{
                    fileSize: 1024 * 1024
            }
            
        });
    
 
module.exports = upload;