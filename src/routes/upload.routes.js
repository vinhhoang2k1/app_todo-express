const express = require('express')
const router = express.Router();
const { upload, getListFiles, download ,preview} = require('../controllers/upload.controllers')
// const uploadFile = require("../middleware/upload.middleware");
// const { route } = require('./todo.routes');

router.post('/single', upload)
router.get('/file/:name', preview)
// router.get('/list',preview)

// router.post('multiple', multipleFile)
router.get('/test', () => {
    console.log('getaaa');
})
module.exports = router