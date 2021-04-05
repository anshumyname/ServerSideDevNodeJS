const express = require('express');
const dishRouter = express.Router();



dishRouter.use(express.json());

dishRouter.route('/')
.all((req, res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
 })
 
.get((req, res,next) => {
    res.end('Will send all the dishes to you!');
 })
 
.post( (req, res, next) => {
  // console.log(req);
    res.end('Will ad the dish : ' + req.body.name + ' with details: ' + req.body.description)
 })
 
.put((req, res, next) => {
   res.statusCode  = 403;
   res.end('PuT operation not operation on /dishes')
 })
 
.delete( (req, res, next) => {
   res.end('Deleting all the dishes!! ')
 })


dishRouter.route('/:dishId')
.get( (req, res,next) => {
    res.end('Will send all the dishes to you!' + req.params.dishId+ ' to you');
  })
  
  .post( (req, res, next) => {
    res.statusCode  = 403;
    res.end('POST operation not operation on /dishes ' + req.params.dishId);
  })
  
  .put((req, res, next) => {
   res.write('Updating the dish : ' + req.params.dishId);
   res.end('will update the dish '  + req.body.name + ' with detail ' + req.body.description);
  })
  
  .delete( (req, res, next) => {
   res.end('Deleting '+ req.params.dishId+' the dishes!! ')
  })
  
 
 
 module.exports = dishRouter

