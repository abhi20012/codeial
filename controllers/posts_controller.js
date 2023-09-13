const Post = require('../models/post');


//to create a new post
module.exports.create = async function(req, res){
	try {
		const post = await Post.create({
			content:req.body.content,
			user:req.user._id
		});
		return res.redirect('back');
	} catch (error) {
		console.log("Error while creating post", error);
		return;
	}
}