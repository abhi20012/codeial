const Friendship = require('../models/friendship');
const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(request, respond){
    try{

        const loggedInUserId = request.user;

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

        
        let users = await User.find({})

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
}

