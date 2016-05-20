var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Add currency schema for price
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var commentSchema = new Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var Dish = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  price: {
    type: Currency,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  comments: [commentSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Dish', Dish);
