const express = require('express');
const promoRouter = express.Router();



promoRouter.use(express.json());

promoRouter.route('/')
.all((req, res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
 })
 
.get((req, res,next) => {
    console.log(req);
    res.end('Will send all the promotions to you!');
 })
 
.post( (req, res, next) => {
  // console.log(req);
    res.end('Will ad the promo : ' + req.body.name + ' with details: ' + req.body.description)
 })
 
.put((req, res, next) => {
   res.statusCode  = 403;
   res.end('PuT operation not operation on /promotions')
 })
 
.delete( (req, res, next) => {
   res.end('Deleting all the promotions!! ')
 })


promoRouter.route('/:promoId')
.get( (req, res,next) => {
    res.end('Will send all the promotions to you!' + req.params.promoId+ ' to you');
  })
  
  .post( (req, res, next) => {
    res.statusCode  = 403;
    res.end('POST operation not operation on /promotions ' + req.params.promoId);
  })
  
  .put((req, res, next) => {
   res.write('Updating the promotions : ' + req.params.promoId);
   res.end('will update the promotions '  + req.body.name + ' with detail ' + req.body.description);
  })
  
  .delete( (req, res, next) => {
   res.end('Deleting '+ req.params.promoId+' the promotions!! ')
  })
  
 
 
 module.exports = promoRouter

