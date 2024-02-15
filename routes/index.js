var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");
const passport = require('passport');
const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()))
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Express' });
});
router.get('/profile',isloggedIn , async  function(req, res, next) {

  const user = await userModel.findOne({username:req.session.passport.user}).populate("posts");
  const posts = await postModel.find().populate("user");
  res.render('profile', { user , posts });
});
router.get('/calender',isloggedIn , function(req, res, next) {
  res.render('calender');
});
router.get('/archieved_task',isloggedIn , function(req, res, next) {
  res.render('archieved_task');
});
router.get('/team',isloggedIn ,function(req, res, next) {

  res.render('team');
});
router.get('/dashboard',isloggedIn , async  function(req, res, next) {
  const user = await userModel.findOne({username:req.session.passport.user}).populate("posts");
  res.render('dashboard',{user});
});
router.get('/Addtask',isloggedIn , function(req, res, next) {
  res.render('Addtask');
});

// Assuming you're using Express.js
router.post('/delete', async (req, res) => {
  try {
      const post = await postModel.findOneAndDelete({ username: req.session.passport.user });
      // Optionally, you can handle success or failure cases here
      res.send({ message: 'Task deleted successfully' }); // Send a success response
  } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting task'); // Handle errors appropriately
  }
});




router.post("/createtask" , isloggedIn, async function(req,res){
 const user = await userModel.findOne({username: req.session.passport.user});
const post = await  postModel.create({
  user: user._id,
  title: req.body.title,
  description: req.body.description,
  date: req.body.date,
  priority: req.body.priority,
});
user.posts.push(post._id);
await user.save();
res.redirect("/dashboard");
});
  // Auth/Aouth
router.post('/register', function(req, res, next) {
const userData = new userModel({
  username: req.body.username,
  email:req.body.email,
  name: req.body.name,
});
userModel.register(userData, req.body.password)
.then(function(){
  passport.authenticate("local")(req,res,function(){
    res.redirect("/profile");
  })
});
});
router.post("/login", passport.authenticate("local", {
  successRedirect:"/profile",
  failureRedirect:"/"
}),function(req , res ){} )


router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

function isloggedIn(req , res , next  ){
  if(req.isAuthenticated()){
    return next();
  }
 res.redirect("/")
}
module.exports = router;
