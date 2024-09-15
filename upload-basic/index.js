// server.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');

// 2 library below, use to manage file in node.js
const path = require('path');
const fs = require('fs')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`
      cb(null, fileName)
      req.on('aborted', () => {
        // delete file that not successful
        const fullPath = path.join('uploads', fileName)
        fs.unlink(fullPath, (err) => {
          // Error is handled silently
        });
      })
    }
  });
  
// validation 
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg') {
    // allow 
    cb(null, true)
  } else {
    cb(new Error('not allow other files without image/jpeg'), false)
  }
}

const upload = multer({
        storage,
        fileFilter
    });

const port = 8000;

const app = express();

app.use(cors())


app.post('/upload', (req, res) => {
    upload.single('test')(req, res, (err) => {
      if (err) {
        console.log('error', err.message)
        res.status(400).json({message: err.message})
        return res.req.destroy()
      } 
      res.json({message: 'Upload Successful'})
    })
    
  })

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
});
