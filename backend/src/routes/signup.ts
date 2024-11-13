import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "../common/src";
import { Session } from "express-session";

import { User, Folder } from "../models/user";
interface MySessionData {
  [key: string]: any;
}

interface MySession extends Session {
  jwt?: string;
  data?: MySessionData;
}
const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
    body("firstName")
      .notEmpty()
      .withMessage("First name is required")
      .isLength({ max: 20 })
      .withMessage("First name must be at most 20 characters long"),
    body("lastName")
      .notEmpty()
      .withMessage("Last name is required")
      .isLength({ max: 20 })
      .withMessage("Last name must be at most 20 characters long"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, firstName, lastName } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password, firstName, lastName });

    // Create a default folder for the user
    const defaultFolder = Folder.build({ name: "Root Folder" });
    await defaultFolder.save();

    // Add the default folder to the user's folders array
    user.folders = [defaultFolder];
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      "asdf"
    );

    // Store it on session object
    (req.session as any).jwt = userJwt;

    res.status(201).send(user);
  }
);

export { router as signupRouter };
