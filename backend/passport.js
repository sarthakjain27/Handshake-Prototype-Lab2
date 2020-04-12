
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const Config = require('./config');
const kafka = require('./kafka/client');

// Setup work and export for the JWT passport strategy
function auth() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: Config.secret,
  };
  passport.use(
    new JwtStrategy(opts, (jwtPayload, callback) => {
      const msg = {};
      msg.user_id = jwtPayload._id;
      msg.userRole = jwtPayload.userRole;
      kafka.make_request('passport', msg, (err, results) => {
        if (err) {
          return callback(err, false);
        }
        if (results) {
          callback(null, results);
        } else {
          callback(null, false);
        }
      });
    }),
  );
}

exports.auth = auth;
exports.checkAuth = passport.authenticate('jwt', { session: false });
