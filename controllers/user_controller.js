const User = require('../models/user');


module.exports.profile = async function(req, res){
	const user = await User.findById(req.params.id);

	return res.render('user_profile', {
		title:"User Profile",
		profile_user:user
	});
}


//rendering the signup page
module.exports.signUp = function(req, res){
	if(req.isAuthenticated()){
		return res.redirect('/users/profile');
	}
	return res.render('user_sign_up', {
		title:"Sign Up page"
	})
}

//rendering the signin page
module.exports.signIn = function(req, res){
	if(req.isAuthenticated()){
		return res.redirect('/users/profile');
	}
	return res.render('user_sign_in', {
		title:"Sign In page"
	})
}

//get the sign up data
module.exports.create =  async function(req, res){
	if(req.body.password != req.body.confirm_password){
		return res.redirect('back');
	}

	try {
		const user = await User.findOne({email: req.body.email});
		if(!user){
			try {
				User.create(req.body);
				return res.redirect('/users/sign-in');
			} catch (error) {
				console.log("Error in creating a user :: User Controller Error", error);
				return;
			}
		}else{
			alert("User already exist");
			return res.redirect('back');
		}
	} catch (error) {
		console.log("Error in finding the user::User Controller Error", error);
		return;
	}
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
	console.log(req.body);
	return res.redirect('/');
}

module.exports.destroySession = function(req, res, next){
	req.logout(function(err){
		if(err){
			return next(err);
		}
		return res.redirect('/users/sign-in');
	});

}