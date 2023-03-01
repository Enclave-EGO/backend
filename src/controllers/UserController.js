import {
  checkExistedEmail,
  checkExistedUsername,
  createNewUser,
  checkUserSignIn
} from "../services/crudDatabase/user.js";
import { generateAccessToken } from "../services/authentication/index.js";
import { validateUser, validateSignIn } from "../validators/userValidator.js";

const UserController = {
  createUser: async (req, res) => {
    const { status, error } = await validateUser(req, res);

    if (status === "Fail")
      return res.status(400).json({
        status: "Fail",
        error: error,
        data: null
      });

    const { password, username, name, email, role } = req.body;
    const [isExistedUsername, isExistedEmail] = await Promise.all([
      checkExistedUsername(username),
      checkExistedEmail(email)
    ]);

    const isExistedUser = isExistedEmail || isExistedUsername;
    if (isExistedUser) {
      return res.status(404).json({
        status: "Fail",
        error: "Username or Email existed",
        data: null
      });
    }

    try {
      const newUser = {
        password,
        username,
        name,
        email,
        role
      };

      const output = await createNewUser(newUser);

      const payload = { _id: output._id, role: role };
      const token = await generateAccessToken(payload);

      return res
        .status(200)
        .json({ status: "Success", error: null, data: { ...output, token } });
    } catch (error) {
      return res.status(500).json({ status: "Fail", error: error, data: null });
    }
  },

  signIn: async (req, res) => {
    const { status, error } = await validateSignIn(req, res);

    if (status === "Fail")
      return res.status(400).json({
        status: "Fail",
        error: error,
        data: null
      });

    const { password, username } = req.body;

    try {
      const user = { username, password };
      const output = await checkUserSignIn(user);

      if (output) {
        return res.status(200).json({
          status: "Success",
          error: null,
          data: output
        });
      } else {
        return res.status(400).json({
          status: "Fail",
          error: null,
          data: null
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: "Fail",
        error: error,
        data: null
      });
    }
  }
};

export default UserController;
