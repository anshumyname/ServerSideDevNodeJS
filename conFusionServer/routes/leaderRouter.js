const express = require('express');
const leaderRouter = express.Router();



leaderRouter.use(express.json());

leaderRouter.route('/')
.all((req, res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
 })
 
.get((req, res,next) => {
    console.log(req);
    res.end('Will send all the leaders to you!');
 })
 
.post( (req, res, next) => {
  // console.log(req);
    res.end('Will ad the leader : ' + req.body.name + ' with details: ' + req.body.description)
 })
 
.put((req, res, next) => {
   res.statusCode  = 403;
   res.end('PuT operation not operation on /leaders')
 })
 
.delete( (req, res, next) => {
   res.end('Deleting all the leaders!! ')
 })


leaderRouter.route('/:leaderId')
.get( (req, res,next) => {
    res.end('Will send all the leaders to you!' + req.params.leaderId+ ' to you');
  })
  
  .post( (req, res, next) => {
    res.statusCode  = 403;
    res.end('POST operation not operation on /leaders ' + req.params.leaderId);
  })
  
  .put((req, res, next) => {
   res.write('Updating the leaders : ' + req.params.leaderId);
   res.end('will update the leaders '  + req.body.name + ' with detail ' + req.body.description);
  })
  
  .delete( (req, res, next) => {
   res.end('Deleting '+ req.params.leaderId+' the leaders!! ')
  })
  
 
 
 module.exports = leaderRouter

