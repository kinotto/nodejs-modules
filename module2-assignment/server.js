var mongoose = require('mongoose');
var assert = require('assert');

var Dishes = require('./models/dishes');

var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function(){
  console.log('connected correctly to the server');
  Dishes.create({
    name: "Uthapizza",
    image: "images/uthapizza.png",
    category: "mains",
    label: "Hot",
    price: "4.99", //divided 100 from mongoose-currency is 4.99$
    description: "A unique...",
    comments: [
      {
        rating: 5,
        comment: 'Imagine all the eatables, living in conFusion!',
        author: 'John Lemon'
      }
    ]
  }, function(err, dish){
    if (err) throw err;
    console.log('Dish created');
    console.log(dish);
    dish.comments.push({
      rating: 4,
      comment: 'Sends anyone to heaven, I wish I could get my mother-in-law to eat it!',
      author: 'Paul McVites'
    })
    setTimeout(function(){
      dish.save(function(err, dish){
        if (err) throw err;
        console.log('Updated comments');
        console.log(dish);
        db.collection('dishes').drop(function(){
          console.log('Dishes collection dropped');
          db.close();
        })
      })
    }, 2000);
  })

})
