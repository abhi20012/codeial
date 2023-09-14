const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comment_mailers');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_workers');

module.exports.create = async function(req, res){
	try {
		const post = await Post.findById(req.body.post);
		if(post){
			let comment = await Comment.create({
				content:req.body.content,
				post:req.body.post,
				user:req.user._id
			});

			post.comments.push(comment);
			post.save();

			comment = await comment.populate('user', 'name email');
			// commentsMailer.newComment(comment);

			let job = queue.create('emails', comment).save(function(err){
                if(err){
                    console.log('Error in sending to the queue', err);
                    return;
                }
                console.log('job enqueued', job.id);
            });

			if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Comment created!"
                });
            }
			req.flash('success', 'Comment published!');
			return res.redirect('/');
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