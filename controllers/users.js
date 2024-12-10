const User = require("../models/user");
 
module.exports.renderSignUp = (req,res)=>{
  res.render("users/sign.ejs");
}

module.exports.signUp = async (req,res) =>{
  try{
  let {username,email,password} = req.body;
  const newUser = new User({email,username});
  const registeredUser = await User.register(newUser,password);
  req.login(registeredUser,(err)=>{
      if(err){
          return next(err);
      }
      req.flash("success","Welcome to WanderLust");
      res.redirect("/listings");
  })
  }
  catch(e){
      req.flash("error",e.message);
      res.redirect("/signup");
  }
}

module.exports.renderLoginForm = (req,res)=>{
  res.render("users/login.ejs");
}

module.exports.login = async(req,res)=>{
  req.flash("success","welcome to wanderLust");
  let redirectUrl = res.locals.redirectUrl || "/listings"
  res.redirect(redirectUrl);
}

module.exports.logOut  = (req,res,next)=>{
  req.logOut((err)=>{
      if(err){
         return  next(err);
      }
      req.flash("success","You are loggedOut");
      res.redirect("/listings");
  })
};