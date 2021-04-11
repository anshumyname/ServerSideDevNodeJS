const express = require('express');
var authenticate = require('../authenticate');
const promoRouter = express.Router();

const Promotions = require('../model/promotions');
promoRouter.use(express.json());

promoRouter.route('/')
  .get((req, res, next) => {
    Promotions.find({})
      .then((promos) => {
        res.statusCode = 200,
          res.setHeader('Content-Type', 'application/json');
        res.json(promos);
      }, (err) => next(err))

      .catch((err) => next(err));
  })

  .post(authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    Promotions.create(req.body)
      .then((promo) => {
        console.log('Promo Created , ', promo);
        res.statusCode = 200,
          res.setHeader('Content-Type', 'application/json');
        res.json(promo);
      }, (err) => next(err))

      .catch((err) => next(err));
  })

  .put(authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PuT operation not operation on /promotions')
  })

  .delete(authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    Promotions.remove({})
      .then((resp) => {
        res.statusCode = 200,
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
      }, (err) => next(err))

      .catch((err) => next(err));
  })


promoRouter.route('/:promoId')
  .get((req, res, next) => {
    Promotions.findById(req.params.promoId)
    .then((promo) => {
      res.statusCode = 200,
      res.setHeader('Content-Type', 'application/json');
      res.json(promo);
    }, (err) => next(err))

    .catch((err) => next(err));
  })

  .post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not operation on /promotions ' + req.params.promoId);
  })

  .put((req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promoId, {
      $set: req.body
    }, {
      new: true
    })
      .then((promo) => {
        res.statusCode = 200,
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
      }, (err) => next(err))

      .catch((err) => next(err));
  })

  .delete((req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
      .then((resp) => {
        res.statusCode = 200,
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
      }, (err) => next(err))

      .catch((err) => next(err));
  })



module.exports = promoRouter

