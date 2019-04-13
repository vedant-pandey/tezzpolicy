var express					= require("express"),
    app						= express(),
    methodOverride			= require("method-override"),
	mongoose				= require("mongoose"),
	flash					= require("connect-flash"),
	expressSanitizer		= require("express-sanitizer"),
    bodyParser				= require("body-parser");
    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////
 // Environment Variable //
//////////////////////////

var PORT                    = process.env.PORT,
    DB                      = process.env.DB;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////
 // Connections //
/////////////////

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
mongoose.connect("mongodb://localhost/tezzpolicy", {useMongoClient: true});
app.use(expressSanitizer());
app.use(methodOverride("_method"));
// app.use(flash());

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   /////////////////////////////
  // Passport Configurations //
 /////////////////////////////

//  app.use(require("express-session")({
//  	secret: "Alakazaam!",
//  	resave: false,
//  	saveUninitialized: false
//  }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use(function(req, res, next) {
// 	res.locals.user = req.user;
// 	res.locals.error = req.flash("error");
// 	res.locals.success = req.flash("success");
// 	next();
// });
// seedDB();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////
 // Routes //
////////////


app.get("/",(req,res)=>{
    res.render('home');
});

app.get('/about',(req,res)=>{
    res.render('about');
});

app.get('/contact',(req,res)=>{
    res.render('contact');
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////
 // Listener //
//////////////

app.listen(PORT, function() {
	console.log("SERVER ONLINE");
});