const Post = require('../models/post');
const User = require('../models/user');


module.exports.home = async function(req, res){

	const posts = await Post.find({})
	.sort('-createdAt')
	.populate('user')
	.populate({
		path:'comments',
		populate:{
			path:'user'
		}
	}).populate({
		path: 'comments',
		populate: {
			path: 'likes'
		},
	})
	// .populate('comments')
	.populate('likes');

	const users = await User.find({});

	return res.render('home', {
		title:"Home",
		posts:posts,
		all_users:users
	});

	
}