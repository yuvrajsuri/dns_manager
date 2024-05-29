const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const bodyParser = require("body-parser");

const ExpressError = require("./utils/ExpressError.js");
require('dotenv').config();


const recordRoute = require("./routes/recordRoute.js")
const UserRoute = require("./routes/userRoute.js");


const session = require("express-session");
const MongoStore = require('connect-mongo');

const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./Models/User.js");


const dbUrl = process.env.ATLASDB_URL;
//'mongodb://127.0.0.1:27017/dnsServer'


main()
.then((res)=>{
    console.log("connected to DB");
}
).catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const store = MongoStore.create({
  mongoUrl : dbUrl,
  crypto : {
      secret : process.env.SECRET
  },
  touchAfter : 24*3600
});

store.on("error",(err)=>{
  console.log("ERROR IN MONGO SESSION STORE",err);
});

const sessionOptions = {
  store,
  secret : process.env.SECRET,
  resave : false ,
  saveUninitialized : true,
  cookie : 
  {
      expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge : 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
  },
};

app.use(session(sessionOptions));
  app.use(flash());
  
  // flash messages
  app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user||null;
    next();
  });

app.use(passport.initialize());
app.use(passport.session());

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/', recordRoute);
app.use("/", UserRoute);


app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
});

//Error Handling Middleware
app.use((err,req,res,next)=>{
    let {statusCode = 500 , message = "Something went wrong"} = err;
    
    res.status(statusCode).render("Error.ejs",{message});
    // console.log(err);
    next();
});

app.listen("3000",()=>{
    console.log("Server listening to port 3000");
});