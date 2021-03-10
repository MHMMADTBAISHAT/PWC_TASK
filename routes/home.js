
var express = require("express"),
    User = require("../models/user"),
router = express.Router();


router.get("/" , function(req , res) {
    console.log(req.isAuthenticated());
    res.render("home/index");
});

router.get("/Users" , isLoggedIn , IS_Admin, (req , res) => {
    User.find({} , (err , foundUsers) => {
        if(err) {
            //console.log(err);
            return res.redirect("back");
        } else {
            res.render("home/users" , { Usres : foundUsers});
        }
    });
});

router.get("/Users/:id"  , isLoggedIn , IS_Admin,(req , res) => {
    User.findByIdAndRemove(req.params.id , (err , deletedUser) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/Users");
        }
    })
});



// middle ware to check is logged in or not
function isLoggedIn (req , res , next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}

// middle ware to check is admin in or not
function IS_Admin (req , res , next) {
    if(req.user.isAdmin) {
        return next();
    } else {
        res.redirect("/");
    }
}

module.exports = router;