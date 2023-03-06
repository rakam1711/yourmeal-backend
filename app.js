const express =require("express");
const bodyParser = require("body-Parser");
const http= require("http");
const mongoose = require("mongoose");
const ejs = require("ejs");
const {DefaultUser} = require('passport-local-mongoose')

const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

// const userRouter=require("./routes/user")
//
// app.use('/user',userRouter);
const app = express();
app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extendend:true}));

app.use(session({
  secret:" any long secret .",
  resave:false,
  saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb://0.0.0.0:27017/userDB");
// mongoose.set("useCreateIndex", true);


const userSchema = new mongoose.Schema({
  email:String,
  password:String
});

userSchema.plugin(passportLocalMongoose);

var User = new mongoose.model('User' , userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",function(req,res){
  res.render("home");
});
app.get("/login",function(req,res){
  res.render("login");
});
app.get("/register",function(req,res){
  res.render("register");
});
app.get("/secrets",function(req,res){
  if(req.isAuthenticated()){
    res.render("secrets");
  }else{
    res.render("/login");
  }
});

app.post("/register", async function(req,res){
const user = new DefaultUser({username:req.body.username})
await user.setPassword(req.body.password)
await user.save();

});


app.post("/login", function(req,res){

    const user = new User({
      username: req.body.username,
      password:req.body.password
    });
    req.login(user,function(err){
      if(err){
        console.log(err);
      }else{
        passport.authenticate("local")(req,res, function(){
          res.redirect("/secrets")
        })
      }
    })

});



const server = http.createServer(app)
server.listen("3000",()=>{
  console.log("server established");
})
