const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('User')

// Setup work and export for the JWT passport strategy
module.exports = function (passport, config) {
  let opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = config.secret
  passport.use(new JwtStrategy(opts, function (jwtPayload, done) {
    User.findOne({
      id: jwtPayload.id
    }, function (err, user) {
      if (err) {
        return done(err, false)
      }
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
  }))
}
