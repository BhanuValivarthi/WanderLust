const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validListing} = require("../middleware.js");
const { populate } = require("../models/review.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

 const listingController = require("../controllers/listing.js");

 router.route("/")
 .get(wrapAsync(listingController.index))
  .post(isLoggedIn, upload.single('listing[image]'),validListing,wrapAsync(listingController.createListing)
);
 

 router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner, upload.single('listing[image]'),validListing,wrapAsync(listingController.updatedListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));





router.get("/:id/new",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));



module.exports = router;