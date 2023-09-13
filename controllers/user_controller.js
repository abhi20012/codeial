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
module.exports.signIp = function(req, res){
	return res.render('user_sign_in', {
		title:"Sign In page"
	})
}