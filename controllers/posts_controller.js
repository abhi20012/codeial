const Post = require('../models/post');
const Comment = require('../models/comment');

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

module.exports.destroy = async function(req, res){
	// console.log(req.params.id);
	try {
		const post = await Post.findById(req.params.id);
		if(post.user == req.user.id){
			post.deleteOne();

			Comment.deleteMany({post:req.params.id});
			// req.flash('error', 'Post and comments deleted!');
			return res.redirect('back');
		}else{
			// req.flash('error', 'You cannot delete this post');
			res.redirect('back');
		}
	} catch (error) {
		// req.flash('error', 'error from post_controller');
		return res.redirect('back');
	}
}