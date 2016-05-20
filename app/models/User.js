var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var favoriteSchema = new Schema({
  dishID: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var User = new Schema({
  username: String,
  password: String,
  OauthID: String,
  OauthToken: String,
  firstname: {
    type: String,
    default: ''
  },
  lastname: {
    type: String,
    default: ''
  },
  admin: {
    type: Boolean,
    default: false
  },
  favorites: [favoriteSchema]
}, {
  timestamps: true
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
