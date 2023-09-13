const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){
	try {
		const post = await Post.findById(req.body.post);
		if(post){
			const comment = await Comment.create({
				content:req.body.content,
				post:req.body.post,
				user:req.user._id
			});

			post.comments.push(comment);
			post.save();

			res.redirect('/');
		}
		
	} catch (error) {
		console.log("Error while creating a comment", error);
		return;
	}
}

module.exports.destroy =  async function(req, res){
	try {
        const comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
			let postId = comment.post;
	
			comment.deleteOne();
	
			Post.findByIdAndUpdate(postId, {$pull:{comments:req.params.id}});
			return res.redirect('back');
		}
    } catch (error) {
        console.error("Error:", error);
        return res.redirect('back');
    }
	
}