var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config');

exports.getToken = function(user){
  return jwt.sign(user, config.secretKey, {
    expiresIn: 3600
  })
}

exports.verifyOrdinaryUser = function(req, res, next){
  var token = req.body.token || req.params.token || req.headers['x-access-token'];

  if(token){
    jwt.verify(token, config.secretKey, function(err, decoded){
      if(err){
        var error = new Error('you\'re not authenticated');
        error.status = 401; //unauthorized
        next(error);
      } else{
        req.decoded = decoded;
        next();
      }

    })
  } else{
    var error = new Error('no token provided');
    error.status = 403; //forbidden
    next(error);
  }
}

exports.verifyAdmin = function(req, res, next){
  if(req.decoded){
    var admin = req.decoded._doc.admin;
    if(admin){
      next();
    } else{
      var error = new Error('you\'re not authorized to perform this kind of operations');
      error.status = 403;
      next(error);
    }

  } else{
    var error = new Error('perform the login again');
    error.status = 403;
    next(error);
  }
}
