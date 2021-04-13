const express = require('express');
const favoriteRouter = express.Router();
var authenticate = require('../authenticate');
const Favorites = require('../model/favorites');


favoriteRouter.use(express.json());

favoriteRouter.route('/')
    .get(authenticate.verifyUser, (req, res, next) => {
        Favorites.find({ "user": req.user._id })
            .populate("dishes")
            .populate("user")
            .then((favs) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favs);
            }, (err) => next(err))

            .catch((err) => next(err))
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ "user": req.user._id })
            .then((favs) => {
                console.log(favs);
                if (!favs) {
                    var fav = new Favorites();
                    fav.user = req.user._id;
                    fav.dishes = []
                    for (var i = 0; i < req.body.length; i++)
                        fav.dishes.push(req.body[i]._id);

                    favs = fav;
                }
                else {
                    itemlist = req.body
                    for (var i = 0; i < itemlist.length; i++) {
                        if (favs.dishes.indexOf(itemlist[i]._id) === -1) {
                            favs.dishes.push(itemlist[i]._id);
                        }
                    }
                }

                favs.save()
                    .then((favs) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favs);
                    }, (err) => next(err))
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        var err = new Error("PUT Operation not supported on this endpoint ");
        res.statusCode = 500;
        return next(err);
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Favorites.remove({ "user": req.user._id })
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))

            .catch((err) => next(err))
    })

favoriteRouter.route('/:dishId')
    .get(authenticate.verifyUser, (req, res, next) => {
        var err = new Error("GET Operation not supported on this endpoint ");
        res.statusCode = 500;
        return next(err);
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ "user": req.user._id })
            .then((favs) => {
                if (!favs) {
                    var fav = new Favorites();
                    fav.user = req.user._id;
                    fav.dishes = []
                    fav.push(req.params.dishId);
                    favs = fav;
                }
                else {
                    
                    if (favs.dishes.indexOf(req.params.dishId) === -1) {
                        favs.dishes.push(req.params.dishId);
                    }
                    else {
                        var err = new Error("Dish already in Favourite List");
                        res.statusCode = 500;
                        return next(err);
                    }
                }
                favs.save()
                    .then((favs) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(favs);
                    }, (err) => next(err))
            }, (err) => next(err))

            .catch((err) => next(err))
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        var err = new Error("PUT Operation not supported on this endpoint ");
        res.statusCode = 500;
        return next(err);
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        Favorites.findOne({ "user": req.user._id })
            .then((favs) => {
                if (favs.dishes.indexOf(req.params.dishId) === -1) {
                    res.statusCode = 404;
                    return next(err);
                }
                console.log("reaching here");
                favs.dishes.splice(favs.dishes.indexOf(req.params.dishId));
                favs.save();
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(favs);
            })
    })

module.exports = favoriteRouter