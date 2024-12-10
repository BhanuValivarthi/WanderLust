const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js");
const {reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");

module.exports.isLoggedIn = (req,res,next)=>{
  if(!req.isAuthenticated()){
    req.session.redirectUrl = req.originalUrl;
    req.flash("error","you must be logged in to create listing");
    return res.redirect("/login");
  }
  next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
  if(req.session.redirectUrl){
   res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}

module.exports.isOwner = async (req,res,next)=>{
  let {id} = req.params;
  let listing = await Listing.findById(id);
  if(!listing.owner._id.equals(res.locals.currentUser._id)){
    req.flash("error","You are not owner of this listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
}

module.exports.validListing = (req,res,next)=>{
  let {error} = listingSchema.validate(req.body);
  if(error){
    throw new ExpressError(400,error);
  }
  else{
    next();
  }
}

module.exports.validReview = (req,res,next)=>{
  let {error} = reviewSchema.validate(req.body);
  if(error){
    throw new ExpressError(400,error);
  }
  else{
    next();
  }
}

module.exports.isReviewAuthor = async (req,res,next)=>{
  // console.log(req.params);
  let {id,revId} = req.params;
  
  const review = await Review.findById(revId);

  if(!review.author._id.equals(res.locals.currentUser._id)){
    req.flash("error","You are not the author of this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
}
