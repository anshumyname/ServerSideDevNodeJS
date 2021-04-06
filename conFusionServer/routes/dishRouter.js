const express = require('express');
const dishRouter = express.Router();
const mongoose = require('mongoose');

const Dishes = require('../model/dishes');



dishRouter.use(express.json());

dishRouter.route('/')
  .get((req, res, next) => {
    Dishes.find({})
      .then((dishes) => {
        res.statusCode = 200,
          res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
      }, (err) => next(err))

      .catch((err) => next(err));
  })

  .post((req, res, next) => {
    // console.log("We have here ", req.body);
    Dishes.create(req.body)
      .then((dish) => {
        console.log('Dish Created , ' , dish);
        res.statusCode = 200,
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
      }, (err) => next(err))

      .catch((err) => next(err));
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('PuT operation not operation on /dishes')
  })

  .delete((req, res, next) => {
    Dishes.remove({})
    .then((resp) => {
      res.statusCode = 200,
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))

    .catch((err) => next(err));

  })


dishRouter.route('/:dishId')
  .get((req, res, next) => {
      Dishes.findById(req.params.dishId)
      .then((dish) => {
        console.log('Dish Created , ' , dish);
        res.statusCode = 200,
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
      }, (err) => next(err))

      .catch((err) => next(err));

  })

  .post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not operation on /dishes ' + req.params.dishId);
  })

  .put((req, res, next) => {
     Dishes.findByIdAndUpdate(req.params.dishId, {
       $set: req.body
     }, {
       new: true
     })
     .then((dish) => {
      console.log('Dish Created , ' , dish);
      res.statusCode = 200,
      res.setHeader('Content-Type', 'application/json');
      res.json(dish);
    }, (err) => next(err))

    .catch((err) => next(err));
  })

  .delete((req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp) => {
      res.statusCode = 200,
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))

    .catch((err) => next(err));

  })



module.exports = dishRouter

