const express = require('express');//importing express for main index file

const cookieParser = require('cookie-parser');//importing cookie-parser

const app = express();//creating express app

const expressLayouts = require('express-ejs-layouts');//importing express layouts 
//using layouts for views to structure the page 
app.use(expressLayouts);

const db = require('./config/mongoose');//importing database to main index file

const session = require('express-session');//importing express session for the signed in user
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJwt = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

//creating port for our server
const port = 8000;

const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets');
chatServer.listen(5000);
console.log("Chat server is listening on port 5000" )

app.use(express.urlencoded());
//using cookie parser 
app.use(cookieParser());


app.use('/uploads', express.static(__dirname + '/uploads'));
//using static files
app.use(express.static('./assets'));
//makes the uploads path available to the browser
//extract style and pages from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//setting up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
	name:'Codeial',
	secret:'demoKey',
	saveUninitialized:false,
	resave:false,
	cookie:{
		maxAge:(1000*60*100)
	},
	store: MongoStore.create({
		mongoUrl: 'mongodb://0.0.0.0/codeial_development',
		mongooseConnection: db,
		autoRemoved:'disabled'
	}, 
		function(err){
			console.log(err || "connect-mongo setup ok")
		}
	)
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//setting up flash for notification
app.use(flash());
app.use(customMware.setFlash);

//using router to route to other files
app.use('/', require('./routes'));



//listening server
app.listen(port, function(err){
	if(err){
		console.log("Error while running express server", err);
	}

	console.log(`Server is running successfully on port :: ${port}`);
})