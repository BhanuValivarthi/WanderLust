const Listing = require("../models/listing");

module.exports.index = async (req,res)=>{
  let allChats = await Listing.find({});
  res.render("listings/index.ejs",{allChats});
}

module.exports.renderNewForm = (req,res)=>{
  res.render("listings/new.ejs");
}

module.exports.showListing = async (req,res)=>{
  let {id} = req.params;
  let listing = await Listing.findById(id).populate({path:"reviews",
    populate:{
      path:"author"  
    },
  }).populate("owner");
  if(!listing){
   req.flash("error","Listing you requested for is not exist");
   res.redirect("/listings");
  }
  res.render("listings/show.ejs",{listing});
}

module.exports.createListing = async (req,res,next)=>{
  let url = req.file.path;
  let filename = req.file.filename;
 
  const newList = new Listing(req.body.listing);
  newList.owner = req.user._id;
  newList.image = {url,filename};
  await newList.save();
  req.flash("success","New Listing created successfully");
  res.redirect("/listings");
}

module.exports.renderEditForm = async (req,res)=>{
  let {id} = req.params;
  let listing = await Listing.findById(id);
  if(!listing){
    req.flash("error","Listing you requested for is not exist");
    res.redirect("/listings");
   }
   let originalImageUrl = listing.image.url;
   originalImageUrl.replace("/upload","/upload/w_250");
  res.render("listings/edit.ejs",{listing,originalImageUrl});
}

module.exports.updatedListing = async(req,res)=>{
  let {id} = req.params;
  
  let listing =  await Listing.findByIdAndUpdate(id,{...req.body.listing});
  if(typeof req.file !== "undefined" ){
  let url = req.file.path;
  let filename = req.file.filename;
  listing.image = {url,filename};
  await listing.save();
  }
  req.flash("success","Listing is updated successfully");
  res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async(req,res)=>{
  let {id} = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success","Listing is deleted successfully");
  res.redirect("/listings");
}