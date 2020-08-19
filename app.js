var express 		  = require("express"),
	mongoose 		    = require("mongoose"),
	bodyParser 		  = require("body-parser"),
	methodOverride  = require("method-override"),
	expressSantizer = require("express-sanitizer"),
	passport    	  = require("passport"),
	LocalStrategy   = require("passport-local"),
	Blog  			    = require("./models/blog"),
  Comment     	  = require("./models/comment"),
  User        	  = require("./models/user"),
  seedDB     		  = require("./seed"),
  app 			      = express(),
  middleware      = require("./middleware/index"),
  cookieParser    = require("cookie-parser"),
  flash           = require("connect-flash"),
  session         = require("express-session");

const jwt = require('jsonwebtoken');
const cors = require('cors');
app.use(cors());


// Need to configure dotenv
require('dotenv').config();


// Routing for the Schema models:
var commentRoutes    = require("./routes/comments"),
    blogRoutes 		 = require("./routes/blogs"),
    indexRoutes      = require("./routes/index"),
    topicRoutes     = require("./routes/topics");

// assign mongoose promise library and connect to database
mongoose.Promise = global.Promise;

const DBUri = process.env.MONGODB_URI || "mongodb://localhost:27017/cs_blog_post";

//APP CONFIG // Create a new DB to use APP
mongoose.connect('mongodb+srv://Rishi98:<password>@cluster0.oeetu.mongodb.net/<dbname>?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
      .then(() => console.log(`Database connected!`))
      .catch(err => console.log(`Database connection error: ${err.message}`));


// App set and use Configuration

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSantizer());
app.use(cookieParser('secret'));
app.locals.moment = require('moment');
//seedDB();


// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "This Blog is the best!",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Let other JS pages have access to the current user
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});


const privateKey = `
-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDVO/KAor9EOG0r
TmjHiXOEiGWcdarpMOQl4blUralcRUhcx404f8Uw4Kf2UafomDfOoZPQ13XS0JxX
If4oBbTlGKPbVN7N1FJA/ANE3wKTw/PH6SvqxxWF4hP0eryf0SZZWFy7C+0deRpF
tPr8peRk1niX+UsaOvA2HV3oLFBaX5Dq2PhzDhJtoTSD9DYasL0+vb2jnWcAe3TD
XJ2dWM1ZVi6TW56psC2uV4PIqt0cPoPlXOTD/povS8oBIyBT0U/ZO1NSlkMCCJdU
F+H7AJbmqx7qdeg8gEjWu5QJ2vMfGmf5CALkA/MwF9QAFja/qMQyIwKPJHmkxTpb
HcGPrN1bAgMBAAECggEABqCvX+ovEbrDQeZVAWa3TXZD2kIaBtd7L+Y9MXGYYwLQ
Rfn53Liz81n4PoK5OlSI34ZMJuCbi+rqARdQZAQRZFGIvkd8CV/BEr4CiAB6fwdH
K36G2+xGMfwd7Kpn9Hu2um4xq6qqOxFJjMMcTgAGAlBcPTUFbZJJZxUwlwfRk414
UgMLG9sZE2kNgsu49ZjPDkN3FtazZHLSMuulpBvszKy1Kg+xPgLn9Bfbi8MaYY8f
otnen2QA29cm/Wvo1gF+mOeOkq7C/PZh05YWA0pH/IriwxgA88ROWfB9vgOQK+10
llGZJ5E3+WutR3hnjRubRa5FQ9EH2FyaFQnBgNpiIQKBgQD30soBGvaxcNHd8nq8
YbL5nMTghmESB8JOp3fJ+1Pe3zPmwO0hCBZKo9dS06G6+6Tuxmm1Q4hu4s54HlKi
MmAzkktziLg+YAuAm1BO3swhDbYJ2J+dudL/VS/CNYMJieD7msx6YgvCZ3egEGlg
CPtxtFwq40PIDXQmCkRXTiTsKwKBgQDcRQEgc9bqiazpwLLwki/TlZcrf0ngM2L6
6MNzxgRQjc0X19qIef6uwqNs87KGdV387oBifj8XlmKSiVixKlK/Ojl1sFAsISAN
jS5tXEMhKijSdujCbunY/v1YHNHLO8pjOOI+lwk23Ia6hALsZBa3Px9TEsS18L27
gkKJePfLkQKBgQCaO6qSg4hyqCdEvUsbgKZVaPayUY+KHCAWuWz43Jy3ASyY+Qrb
WuActdklaCaoa0KbhAp30D7R2//pi92bqkRq9CpXDgi0cSvXb1HMtCZQj+ryN8om
7GZfmFGvyYPy5MeLbyzBIdH1vFUb3frm1NBAVKJj4qrlj1Hw9sTPnQennwKBgF+p
/H5KsSl1l8qBrXV8GBdtnZT/mGcuCivs0Y5DjvYpT8yuK7QgP7NIx093W6635JUI
RGwCZoZpAvCfhAyV1BBHSlNJutgfntsj2OkYK/OIauhVSmu/XgKnZAJTqe35TsHf
H6uNTywrhLwWv2pJYfA+Eu2ydgqKvuxj+1/XUM9xAoGBAMd0z3r6VBseIB9koGGe
IrlS810Dg6hyHDEFrdJgr3kjnwrCF5VsDZ0geT1AJf0Xw1Doi9pPAvF7a/iLlhsW
N/5zK0yscTGYME8yaEo6yF96TFBnunE4ZP4DVebZGRSTHH3jySoECKDJjG7KgRuE
QTxfhyBy1TrMiXh61WsvaoOs
-----END PRIVATE KEY-----
`;

app.post('/jwt', function (req, res) {
  // NOTE: Before you proceed with the TOKEN, verify your users' session or access.
  const payload = {
    sub: '123', // Unique user id string
    name: 'Rishi Selvakumaran', // Full name of user

    // Optional custom user root path
    // 'https://claims.tiny.cloud/drive/root': '/johndoe',

    exp: Math.floor(Date.now() / 1000) + (60 * 10) // 10 minutes expiration
  };

  try {
    const token = jwt.sign(payload, privateKey, { algorithm: 'RS256'});
    res.set('content-type', 'application/json');
    res.status(200);
    res.send(JSON.stringify({
      token: token
    }));
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
});

// Set the routes for the Apps
app.use("/", indexRoutes);
app.use("/blogs", topicRoutes);
app.use("/blogs", blogRoutes);
app.use("/blogs/:id/comments", commentRoutes);


//Setup app server for viewing
app.listen("3000", process.env.IP, function(){
	console.log("Yep server is connected");
});