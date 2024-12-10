
const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController  = require("../controllers/reviews.js");


router.post("/",isLoggedIn,validReview,wrapAsync(reviewController.createReview));

router.delete("/:revId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));

module.exports = router;