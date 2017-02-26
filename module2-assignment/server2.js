var mongoose = require('mongoose');
var Promotions = require('./models/promotions');

var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function(){
  Promotions.create({
    name: 'Weekend Grand Buffet',
    image: 'images/buffet.png',
    label: 'New',
    price: '19.99',
    description: 'Featuring...'
  }, function(err, promotion){
    if(err) throw err;
    console.log('created Promotion');
    console.log(promotion);
    setTimeout(function(){
      promotion.description = 'Updated description';
      promotion.save(function(err, promotion){
        if(err) throw err;
        console.log('Updated promotion');
        console.log(promotion);
        db.collection('promotions').drop(function(){
          console.log('Promotions collection dropped');
          db.close();
        })
      })
    }, 1000)
  });

})
