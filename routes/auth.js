
var express = require("express"),
    router = express.Router(),
    passport   = require("passport"),
    User       = require("../models/user");


router.get("/register" , function(req , res) {
    res.render("auth/register");
});

// Route for save info form register form
router.post("/register" , function(req,res) {
    // User is the model name of userSchema
    console.log(req.body.password);
    var pass = false;
    if(req.body.secret == "admin123") {
        pass = true;
    }
    
    User.register(new User({username: req.body.username , isAdmin: pass}) , req.body.password , function(err , user){
        if(err) {
           // req.flash("authError" , err.message);
           console.log(err);
           // return res.redirect("/register");
        }
        console.log(user);
        passport.authenticate("local")(req , res , function(){
            //req.flash("authSuccess" , "You are register successfully, You must be login to continue");
            
            res.redirect("/");
        });
    });
});



router.get("/login" , (req , res) => {
    res.render("auth/login");
});


// Route for check is your info is correct to login
router.post("/login" , passport.authenticate("local" , {
    failureRedirect: "/login",
    successRedirect: "/"
   }) ,function(req , res){
    // this function empty for now
});





router.get("/logout" , function(req , res) {
    req.logout();
    res.redirect("/");
});



    
    
module.exports = router;