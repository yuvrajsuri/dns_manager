
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

//const jwt = require('jsonwebtoken');
// const User = require('./Models/User.js');
// require('dotenv').config();


// module.exports.auth = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization').replace('Bearer ', '');
//         if (!token) {
//             throw new Error('No token, authorization denied');
//         }
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
//         if (!user) {
//             throw new Error('User not found');
//         }
//         req.token = token;
//         req.user = user;
//         next();
//     } catch (error) {
//         res.status(401).send({ error: error.message });
//     }
// };