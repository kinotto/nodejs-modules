var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Favorite = new Schema({
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  dishes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Dish'
    }
  ]
})

module.exports = mongoose.model('Favorite', Favorite);
