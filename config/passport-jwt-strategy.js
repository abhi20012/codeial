const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const env = require('../config/environment');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: env.jwt_secret
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    const user = User.findById(jwtPayLoad._id);
        
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
}
));

module.exports = passport;