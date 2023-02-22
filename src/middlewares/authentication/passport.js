import passport from "passport";
import pkg, { ExtractJwt } from "passport-jwt";
import { JWT_SECRET_KEY } from "../../constants/index.js";
const JwtStrategy = pkg.Strategy;

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
      secretOrKey: JWT_SECRET_KEY
    },
    (payload, response) => {
      try {
        return response(null, payload);
      } catch (error) {
        response(error, false);
      }
    }
  )
);
