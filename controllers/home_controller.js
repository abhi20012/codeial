const Friendship = require('../models/friendship');
const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(request, respond){
    try{

        const loggedInUserId = request.user;

<<<<<<< HEAD
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
        }).populate({
            path: 'comments',
            populate: {
                path: 'likes'
            },
        })
        .populate('likes');   //for post
=======
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
	.populate('likes');
>>>>>>> 80880488d244e8dc0f900e7c1e25600ebe58a7ff

        
        let users = await User.find({})

<<<<<<< HEAD
        let friendlist = await Friendship.find({ from_user: loggedInUserId })
        .populate({
            path: 'to_user',
            populate: {
                path: 'name'
            }
        })


        return respond.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: users,
            all_friends: friendlist
        });
    }catch(err){
        console.log('Error', err);
    }
=======
	return res.render('home', {
		title:"Home",
		posts:posts,
		all_users:users,
		
	});
>>>>>>> 80880488d244e8dc0f900e7c1e25600ebe58a7ff
}

