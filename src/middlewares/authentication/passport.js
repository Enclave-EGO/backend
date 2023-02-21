import passport from "passport";
import pkg, { ExtractJwt } from "passport-jwt";
const JwtStrategy = pkg.Strategy;
import { JWT_SECRET_KEY } from "../../constants/index.js";

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
      secretOrKey: JWT_SECRET_KEY
    },
    (payload, done) => {
      try {
        console.log(payload);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
