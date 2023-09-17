const express = require('express');
const router = express.Router();
const passport = require('passport');

const friendController = require('../controllers/friend_controller');

// Send a friend request
router.get('/friendship/add/:id', passport.checkAuthentication, friendController.addFriend);

// Accept a friend request
// router.post('/friendship/accept', friendController.acceptFriendRequest);

// Remove a friend
router.get('/friendship/remove/:id', passport.checkAuthentication, friendController.removeFriend);

module.exports = router;