var mongoose = require('mongoose');
var Leadership = require('./models/leadership');
var url = 'mongodb://localhost:27017/conFusion';

mongoose.connect(url);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function(){
  Leadership.create({
      name: 'Peter Pan',
      image: 'images/alberto.png',
      designation: 'Chief Epicurious Officer',
      abbr: 'CEO',
      description: 'Our CEO, Peter...'
  }, function(err, leadership){
    if(err) throw err;
    console.log('leadership created');
    console.log(leadership);
    setTimeout(function(){
      leadership.designation = 'new designation..';
      leadership.save(function(err, leadership){
        if(err) throw err;
        console.log('updated leadership');
        console.log(leadership);

        db.collection('leaderships').drop(function(){
          console.log('leadership collection dropped');
          db.close();
        })
      })
    }, 2000);

  })

})
