var express = require('express');
var bodyParser = require('body-parser');

var promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')

.all(function(req, res, next){
  res.writeHead(200, {'Content-Type': 'text/plain'});
  next();
})


.get(function(req, res, next){
  res.end('Will send promotions to you');
})

.post(function(req, res, next){
  res.end('Will add the promotion '+ req.body.name + ' with description '+ req.body.description);
})

.delete(function(req, res, next){
  res.end('Will delete promotions');
})


promoRouter.route('/:id')
.all(function(req, res, next){
  res.writeHead(200, {'Content-Type': 'text/plain'});
  next();
})

.get(function(req, res, next){
  res.end('Will send promotion '+req.params.id);
})

.put(function(req, res, next){
  res.write('Updating the promotion: ' + req.params.id + '\n');
  res.end('Will update the promotion: ' + req.body.name +
          ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
  res.end('Will delete the promotion '+req.params.id);
})


module.exports = promoRouter;
