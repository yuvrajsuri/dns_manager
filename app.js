const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");


const recordRoute = require("./Routes/recordRoute.js")
const UserRoute = require("./routes/userRoute.js");


const session = require("express-session");


const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./Models/User.js");




main()
.then((res)=>{
    console.log("connected to DB");
}
).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/dnsServer');
}

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

// 

app.use(session({
    secret: 'your_secret_key', // will replace it soon
    resave: false,
    saveUninitialized: true
  }));
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