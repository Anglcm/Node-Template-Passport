const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const jwtSecret = 'your-jwt-secret-key';

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
}

const User = require('../models/user');

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
    const user = await User.findOne( { where: { id: payload.id } } );

    if(!user) {
        return done(null, false);
    }
    return done(null, user);
}));

const generateToken = (user) => {
    return jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '24h' });
}

const requireAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if(err || !user) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }
        req.user = user;
        next();
    })(req, res, next);
}

module.exports = {
    generateToken,
    requireAuth
}