const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");

router.get("/signup",(req,res)=>{
    res.render('users/signup.ejs');
})

router.post("/signup",wrapAsync(async(req,res)=>{
    try{
       let {username,email,password} =req.body;
       let newUser=new User({username,email});
       let registerUser=await User.register(newUser,password);
       req.login(registerUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","welcome to wanderlust !");
        res.redirect("/listings");
       })
      
    }
    catch(e){
        req.flash("error" , e.message);
        res.redirect("/signup");
    }
}))

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
})

router.post('/login',
    saveRedirectUrl,
    passport.authenticate('local', { 
            failureRedirect: '/login',
            failureFlash: true, }),
    async(req,res)=>{
     req.flash("success", "you are logged in!");
     let redirectUrl=res.locals.redirectUrl || "/listings";
     res.redirect(redirectUrl);
});

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return  next(err);
        }
        req.flash("success","You have Logged out !");
        res.redirect("/listings");
    })
})

module.exports=router;

