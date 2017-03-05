var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Favorite = require('../models/favorites.js');
var express = require('express');
var Verify = require('./verify.js');
var bodyParser = require('body-parser');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());


favoriteRouter.route('/')

.get(Verify.verifyOrdinaryUser, function(req, res, next){

  Favorite.find({}, function(err, favorites){
    var favorite;
    for(var i=0; i<favorites.length; i++){
      if(favorites[i].postedBy == req.decoded._doc._id){
        favorite = favorites[i];
        break;
      }
    }
    if(!favorite){
      return res.json([]);
    } else{
      Favorite.findById(favorite._id)
      .populate('postedBy')
      .populate('dishes')
      .exec(function(err, favorite){
        if(err) next(err);
        res.json(favorite);
      })
    }

  })
})


.post(Verify.verifyOrdinaryUser, function(req, res, next){
  Favorite.find({}, function(err, favorites){
    if(err) next(err);
    var favorite;
    for(var i=0; i<favorites.length; i++){
      if(favorites[i].postedBy == req.decoded._doc._id){
        favorite = favorites[i];
        break;
      }
    }
    if(!favorite){
      Favorite.create({
        postedBy: req.decoded._doc._id,
        dishes: [req.body._id]
      }, function(err, favorite){
        if(err) next(err);
        res.json(favorite);
      })
    } else{
      favorite.dishes.push(req.body._id);
      favorite.save(function(err, resp){
        if(err) next(err);
        res.json(resp);
      })
    }

  })
})

.delete(Verify.verifyOrdinaryUser, function(req, res, next){
  Favorite.find({}, function(err, favorites){
    if(err) next(err);
    var favorite;
    for(var i=0; i<favorites.length; i++){
      if(favorites[i].postedBy == req.decoded._doc._id){
        favorite = favorites[i];
        break;
      }
    }
    Favorite.remove({_id: favorite._id}, function(err, resp){
      if(err) next(err);
      res.json(resp);
    })

  })
})

favoriteRouter.route('/:dishId')
.delete(Verify.verifyOrdinaryUser, function(req, res, next){
  Favorite.find({}, function(err, favorites){
    if(err) next(err);
    var favorite;
    for(var i=0; i<favorites.length; i++){
      if(favorites[i].postedBy == req.decoded._doc._id){
        favorite = favorites[i];
        break;
      }
    }
    for (var i = (favorite.dishes.length - 1); i >= 0; i--) {
      if(favorite.dishes[i] == req.params.dishId){
        console.log('removing dish');
        favorite.dishes.splice(i, 1);
      }
    }
    favorite.save(function(err, result){
      if(err) next(err);
      res.json(result);
    })
  })
})

module.exports = favoriteRouter;
