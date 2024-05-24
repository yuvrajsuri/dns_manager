const User = require("../Models/User.js");

//render signUp form
module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signUp.ejs");
};

//signup
module.exports.signup = async(req,res)=>{
    try{
        let {username , email, password} = req.body;
        const newUser = new User({email , username });
        let registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to trippy");
            res.redirect("/");
        });
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }

};

//render Login form
module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");
};

//login
module.exports.login = async(req,res)=>{
    req.flash("success","Welcome back to trippy");
    let redirectUrl = res.locals.redirectUrl || "/";
    res.redirect(redirectUrl);
};

//logout
module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/");
    });
};

//privacy
module.exports.privacy = (req,res)=>{
    res.render("includes/privacy.ejs");
};

//terms
module.exports.terms = (req,res)=>{
    res.render("includes/terms.ejs");
};