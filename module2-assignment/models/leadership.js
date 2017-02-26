var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LeadershipSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  abbr: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

var Leadership = mongoose.model('leadership', LeadershipSchema);
//map the schema to the leaderships a collection (the 's' is added automatically) 
module.exports = Leadership;
