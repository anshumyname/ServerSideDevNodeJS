const express = require('express');
const uploadRouter = express.Router();
const authenticate = require('../authenticate');
const multer = require('multer');
const Dishes = require('../model/dishes');
const cors = require('./cors');

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files '), false);
    }
    cb(null, true);
}


const upload = multer({ storage: Storage, fileFilter: imageFileFilter });
uploadRouter.use(express.json());

uploadRouter.route('/')
    .get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation not operation on /imageUpload')
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,
        upload.single('imageFile'),
        (req, res, next) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json')
            res.json(req.file)
        })

    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not operation on /imageUpload')
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not operation on /imageUpload')
    })



module.exports = uploadRouter