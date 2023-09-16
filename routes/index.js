const express = require('express');

//creating router 
const router = express.Router();

//controllers 
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);

//router to get to users controllers
router.use('/users', require('./users'));

//router to get to post routes
router.use('/posts', require('./posts'));

//router to get to comment routes
router.use('/comments', require('./comments'));

router.use('/likes', require('./likes'));

router.use('/friends', require('./friends'));
router.use('/forgotPswd',require('./forgotPswd'));
router.use('/api', require('./api'));

console.log('Router loaded');

module.exports = router;