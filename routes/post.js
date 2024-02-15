const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // Reference to the User model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  priority: String ,
});

module.exports = mongoose.model('post', postSchema);


