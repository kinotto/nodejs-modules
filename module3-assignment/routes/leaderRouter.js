var express = require('express');
var bodyParser = require('body-parser');
var LeaderShip = require('../models/leadership');

var leadershipRouter = express.Router();


leadershipRouter.use(bodyParser.json());

leadershipRouter.route('/')

.get(function(req,res,next){
  LeaderShip.find({}, function(err, leaders){
    if(err) throw err;
    res.json(leaders);
  })
})

.post(function(req, res, next){
  LeaderShip.create(req.body, function(err, leadership){
    if(err) throw err;
    var id = leadership._id;
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('added leader with id: '+id);
  })
})

.delete(function(req, res, next){
  LeaderShip.remove({}, function(err, resp){
    if(err) throw err;
    res.json(resp);
  })
});

leadershipRouter.route('/:id')

.get(function(req,res,next){
  LeaderShip.find(req.params.id, function(err, leadership){
    if(err) throw err;
    res.json(leadership);
  })
})

.put(function(req, res, next){
  LeaderShip.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, {new: true}, function(err, leadership){
    if(err) throw err;
    res.json(leadership);
  })
})

.delete(function(req, res, next){
  Leadership.remove(req.params.id, function(err, resp){
    if(err) throw err;
    res.json(resp);
  })
});


module.exports = leadershipRouter;
