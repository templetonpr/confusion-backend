var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Add currency schema for price
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var Promotion = new Schema({
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
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Promotion', Promotion);
