

var express = require("express"),
    router = express.Router(),
    compliant = require("../models/compliant");

// route for view compliant data
router.get("/compliant" , isLoggedIn, (req , res) => {
    compliant.find({} , (err , foundAllCompliant) => {
        if(err) {
            console.log(err);
        } else {
            res.render("compliant/view" , { allCompliant: foundAllCompliant});
        }
    });
});

// route for show form to insert new compliant
router.get("/compliant/new" , isLoggedIn, (req , res) => {
    res.render("compliant/insert");
});

// route for get dtata from form and insert them in the database
router.post("/compliant/new" , isLoggedIn, (req , res) => {
    var newCompliant = {
        creatorUsername: req.user.username,
        creatorId: req.user,
        name: req.body.name_form,
        problem: req.body.problem_form,
        productExperice: req.body.productExperice_form,
        feeback: req.body.feeback_form
    }
    compliant.create(newCompliant , (err , foundNewCompliant) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/compliant/new");
        }
    });
});


// route for chnage staus to Approved
router.get("/compliant/:id/toApproved" ,  isLoggedIn, IS_Admin,(req , res) => {
    compliant.findById(req.params.id , (err , foundCompliant) => {
        if(err) {
            console.log(err);
        } else {
            foundCompliant.status = "Approved";
            foundCompliant.save();
            res.redirect("/compliant");
        }
    });
});

// route for chnage staus to Dismissed
router.get("/compliant/:id/toDismissed" , isLoggedIn, IS_Admin, (req , res) => {
    compliant.findById(req.params.id , (err , foundCompliant) => {
        if(err) {
            console.log(err);
        } else {
            foundCompliant.status = "Dismissed";
            foundCompliant.save();
            res.redirect("/compliant");
        }
    });
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

// middle ware to check is admin in or not
function IS_Admin_not (req , res , next) {
    if(req.user.isAdmin) {
        res.redirect("/");
    } else {
        
        return next();
    }
}

module.exports = router;