const express = require('express');//importing express for main index file

//creating express app
const app = express();

//creating port for our server
const port = 8000;

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