const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new mongoose.Schema({   
  title :{
    type : String,
    required : true
  },
  description:{
    type:String
  },
  image:{
    url:String,
    filename:String,
  },
  price:Number,
  place:{
    type:String,
    default:"America",
  },
  Country:String,
  reviews :[
    {
      type : Schema.Types.ObjectId,
      ref :"Review"
    }
  ],
  owner :{
    type: Schema.Types.ObjectId,
    ref : "User"
  },
  
});

listingSchema.post("findOneAndDelete",async(listing)=>{
   if(listing){
     await Review.deleteMany({_id : {$in : listing.reviews}});
   }
});

const Listing = new mongoose.model("Listing",listingSchema);
module.exports = Listing;