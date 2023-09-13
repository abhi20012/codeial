const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	content: {
		type:String,
		required:true,
	},
	//comment belongs to a user
	user:{
		type:mongoose.SchemaTypes.ObjectId,
		ref: 'User'
	},
	post:{
		type:mongoose.SchemaTypes.ObjectId,
		ref: 'Post'
	},
	//include the array of ids of  all comments in this post schema itself
	// comments: [
	// 	{
	// 		type:mongoose.SchemaTypes.ObjectId,
	// 		ref: 'Comment'
	// 	}
	// ]

}, {
	timestamps:true
})

const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;