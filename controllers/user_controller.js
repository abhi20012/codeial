const User = require('../models/user');
const fs = require('fs');
const path = require('path');


module.exports.profile = async function(req, res){
	const user = await User.findById(req.params.id);

	return res.render('user_profile', {
		title:"User Profile",
		profile_user:user,
	});
}

//updating the users profile
module.exports.update = async function(request, respond){
	if(request.user.id == request.params.id){

		try{
			let user = await User.findByIdAndUpdate(request.params.id);
			User.uploadedAvatar(request, respond, function(err){
				if(err) {console.log('******Multer Error', err)}
				// without body we can't read this bcoz its multi part
				user.name = request.body.name;
				user.email = request.body.email;

				if(request.file){

					if(user.avatar){
						// fs.unlinkSync(path.join(__dirname, '..', user.avatar));
						fs.existsSync(path.join(__dirname, '..',user.avatar));
					}
					// this is saving the path of the uploaded file into the avatar field in the user 
					user.avatar = User.avatarPath + '/' + request.file.filename;
				}
				user.save();
				return respond.redirect('back');
			});
		}catch(err){
			request.flash('error', err);
			return respond.redirect('back');
		}
	}
	else{
		request.flash('error', 'Unauthorized!');
		return respond.status(401).send('Unauthorized');
	}
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
	req.flash('success', "Logged in Successfully");
	return res.redirect('/');
}

module.exports.destroySession = function(req, res, next){
	req.logout(function(err){
		if(err){
			return next(err);
		}
		req.flash('success', "User Logged out");

		return res.redirect('/users/sign-in');
	});

}