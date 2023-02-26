import passport from "passport";
import pkg from "passport-jwt";
const { Strategy, ExtractJwt } = pkg;
import { JWT_SECRET_KEY } from "../../constants";

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
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
