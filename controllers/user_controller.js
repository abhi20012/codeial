module.exports.profile = function(req, res){
	return res.render('user_profile', {
		title:"User Profile"
	});
}


//rendering the signup page
module.exports.signUp = function(req, res){
	return res.render('user_sign_up', {
		title:"Sign Up page"
	})
}

//rendering the signin page
module.exports.signIn = function(req, res){
	return res.render('user_sign_in', {
		title:"Sign In page"
	})
}

//get the sign up data
module.exports.create = function(req, res){
	//TODO later
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
	//TODO later
}