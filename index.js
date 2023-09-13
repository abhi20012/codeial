//importing express for main index file
const express = require('express');
//creating express app
const app = express();
//importing express layouts 
const expressLayouts = require('express-ejs-layouts');

//creating port for our server
const port = 8000;
//using layouts for views to structure the page 
app.use(expressLayouts);

//extract style and pages from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//using static files
app.use(express.static('./assets'));

//using router to route to other files
app.use('/', require('./routes'));


//setting up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//listening server
app.listen(port, function(err){
	if(err){
		console.log("Error while running express server", err);
	}

	console.log(`Server is running successfully on port :: ${port}`);
})