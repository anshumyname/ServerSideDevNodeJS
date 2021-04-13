const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const Dishes  =  require('./dishes');
const User = require('./user');

var FavoriteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    dishes: [ { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish',
    }]

})

var Favorites = mongoose.model('Favorite', FavoriteSchema);
module.exports = Favorites;