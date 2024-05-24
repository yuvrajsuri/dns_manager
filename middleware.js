
module.exports.isLoggedIn = (req,res,next)=>{
    // console.log(req.path ,"..", req.originalUrl);
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be Logged In to Create a New Listing");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};




// module.exports.validateListing = ((req,res,next)=>{
//     let {error} = listingSchema.validate(req.body);
//     // console.log(error);

//     if(error){
//         let errMsg = error.details.map((el)=> el.message).join(",");
//         console.log(errMsg);
//         throw new ExpressError(400, errMsg);
//     }
//     else{
//         next();
//     }
// });

