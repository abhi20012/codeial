const express = require('express');
const passport = require('passport');


const router = express.Router();
const userController = require('../controllers/user_controller');

router.get('/profile/:id', passport.checkAuthentication,   userController.profile);
router.post('/update/:id', passport.checkAuthentication,   userController.update);

router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);

router.post('/create', userController.create);


//using passport as a middle for authentication and authorization
router.post('/create-session', passport.authenticate(
	'local',
	{failureRedirect:'/users/sign-up'},
) ,userController.createSession);


//google auth url
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), userController.createSession);

router.get('/sign-out', userController.destroySession);

module.exports = router;