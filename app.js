var express					= require("express"),
  app						= express(),
  methodOverride			= require("method-override"),
	mongoose				= require("mongoose"),
	flash					= require("connect-flash"),
	expressSanitizer		= require("express-sanitizer"),
  bodyParser				= require("body-parser"),
  nodeMailor        = require("nodemailer");
    
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
});

app.post('/send-email',(req,res)=>{
    let transporter = nodeMailor.createTransport({
      host: 'smtp.gmail.com',
      port:587,
      secure: false,
      auth: {
        user: 'tezzpolicy1@gmail.com',
        pass: 'tezzpolicy123'
      },
      tls:{
        rejectUnauthorized:false
      }
    });
    const output = `
        <b>Tezz Policy Alert</b>
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>  
          <li>Name: ${req.body.name}</li>
          <li>Email: ${req.body.email}</li>
          <li>Phone: ${req.body.phone}</li>
          <li>Policy: ${req.body.policytype} insurance</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>`;
    
    const userRecord = `
        <b>Tezz Policy Alert</b>
        <p>You made an inquiry for ${req.body.policytype} insurance.</p>
        <p>Our customer support will connect with you shortly.</p>
        <b>This is an automated email, please do not reply here.</b>`;

    let mailOptions= {
      from:'tezzpolicy1@gmail.com',
      to: '000ravichauhan000@gmail.com',
      subject: 'Inquiry Tezz Policy',
      text: 'information about the user',
      html: output
    };
    let mailOptions2= {
      from:'tezzpolicy1@gmail.com',
      to: req.body.email,
      subject: 'Tezz Policy',
      text: 'Regarding your inquiry on TezzPolicy',
      html: userRecord
    };
    transporter.sendMail(mailOptions2,(err,info)=>{
      if(err){
        return console.log(err);
      }
      console.log('Message: %s sent: %s',info.messageId,info.response);
    });
    transporter.sendMail(mailOptions,(err,info)=>{
      if(err){
        return console.log(err);
      }
      console.log('Message: %s sent: %s',info.messageId,info.response);
      res.redirect('/');
    });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////
 // Listener //
//////////////

app.listen(PORT, function() {
	console.log("SERVER ONLINE");
});