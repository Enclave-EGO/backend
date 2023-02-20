import { validateUser } from "../validators/userValidate.js";
import {
  checkExistedEmail,
  checkExistedUsername,
  createNewUser
} from "../services/crudDatabase/user.js";
import { generateAccessToken } from "../services/authentication/index.js";

const UserController = {
  createUser: async (req, res) => {
    const { status, error } = await validateUser(req, res);

    if (status === "failed")
      return res.status(400).json({
        message: error,
        error: error
      });

    const { password, username, name, email, role } = req.body;
    const [isExistedUsername, isExistedEmail] = await Promise.all([
      checkExistedUsername(username),
      checkExistedEmail(email)
    ]);

    const isExistedUser = isExistedEmail || isExistedUsername;
    if (isExistedUser) {
      return res.status(404).json({
        message: "Username or Email existed",
        error: "Username or Email existed"
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

      const payload = { _id: output._id, role };
      const token = await generateAccessToken(payload);

      res.status(200).json({ ...output, token });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
};

export default UserController;
