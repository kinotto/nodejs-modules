var express = require('express');
var bodyParser = require('body-parser');


var leadershipRouter = express.Router();


leadershipRouter.use(bodyParser.json());

leadershipRouter.route('/')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
        res.end('Will send all the leader to you!');
})

.post(function(req, res, next){
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting all leaders');
});

leadershipRouter.route('/:id')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
        res.end('Will send details of the leader: ' + req.params.id +' to you!');
})

.put(function(req, res, next){
    res.write('Updating the leader: ' + req.params.id + '\n');
    res.end('Will update the leader: ' + req.body.name +
            ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting leader: ' + req.params.id);
});


module.exports = leadershipRouter;
