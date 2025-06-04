const express=require("express");
const router=express.Router({mergeParams : true});
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedIn,validateReview,isReviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/review.js");

// REVIEWS

//POST ROUTE
router.post("/",isLoggedIn,validateReview, wrapAsync(reviewController.createReview));

// DELETE REVIEW ROUTE 
router.delete("/:reviewID",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));

module.exports=router;
