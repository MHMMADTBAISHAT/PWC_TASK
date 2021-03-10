var express = require("express"),
    app = express(),
    User = require("./models/user"),
    mongoose = require("mongoose");
    bodyParser = require("body-parser"),
    passport              = require("passport"),
    localStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    compliantRouter = require("./routes/compliant"),
    homeRouter = require("./routes/home"),
    authRouter = require("./routes/auth")



// connect mongoDB to local host and make the database name is "Complaint_User_Portal"
mongoose.connect("mongodb://tubaishat:tubaishat1998@cluster0-shard-00-00.2ejy9.mongodb.net:27017,cluster0-shard-00-01.2ejy9.mongodb.net:27017,cluster0-shard-00-02.2ejy9.mongodb.net:27017/Complaint_User_Portal?ssl=true&replicaSet=atlas-jm04p0-shard-0&authSource=admin&retryWrites=true&w=majority" , { useNewUrlParser: true , useUnifiedTopology: true , useFindAndModify: false , useCreateIndex: true});

app.use(require("express-session")({
    secret: "write any thing",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine" , "ejs");
app.use(bodyParser.urlencoded({extended: true}));
//app.use(methodOverride("_method"));

app.use(function(req , res, next){
    res.locals.currentUser = req.user;
    return next();
});


app.use(compliantRouter);
app.use(homeRouter);
app.use(authRouter);


var port = process.env.PORT || "8484";
app.listen(port , function() {
    console.log("Server is starting...");
});
