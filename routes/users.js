const mongoose = require('mongoose');
const plm = require("passport-local-mongoose");
mongoose.connect("mongodb://localhost:27017/Taskflow");
const userSchema =  mongoose.Schema({
  username: String,
  email: String,
  posts:[{
    type:mongoose.Schema.Types.ObjectId,
    ref: "post",
  }],
  password:String,
 
  // Add any additional fields you need for your user model
  // Example: profilePicture: { type: String },
});
userSchema.plugin(plm);
module.exports = mongoose.model('user', userSchema);

 
