const express = require('express');
const router = express.Router();
const passport = require('passport');

const friendController = require('../controllers/friend_controller');

// Send a friend request
<<<<<<< HEAD
router.get('/friendship/add/:id', passport.checkAuthentication, friendController.addFriend);
=======
router.post('/friendship/add', passport.checkAuthentication, friendController.addFriend);
>>>>>>> 80880488d244e8dc0f900e7c1e25600ebe58a7ff

// Accept a friend request
// router.post('/friendship/accept', friendController.acceptFriendRequest);

// Remove a friend
router.get('/friendship/remove/:id', passport.checkAuthentication, friendController.removeFriend);

module.exports = router;