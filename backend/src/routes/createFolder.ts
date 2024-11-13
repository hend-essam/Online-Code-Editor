import { requireAuth } from "../common/src/middlewares/require-auth";
import { User, Folder, File } from "../models/user";
import { currentUser } from "../middlewares/current-user";
import { body } from "express-validator";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "../common/src";
import { Session } from "express-session";

const router = express.Router();
router.post(
  "/api/folders",
  currentUser,
  requireAuth,
  [
    body("name").notEmpty().withMessage("Folder name is required"),
    // Add additional validation rules if needed
  ],
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const userId = req.currentUser!.id; // Assuming you have middleware to set the currentUser property on the request object

    try {
      // Find the user by ID or any other appropriate method
      const user = await User.findById(userId).populate("folders");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Find the root folder for the user
      const rootFolder = user.folders?.find((folder) => !folder.parentFolder);

      if (!rootFolder) {
        throw new BadRequestError("Root folder not found");
      }

      // Create a new folder inside the root folder
      const newFolder = Folder.build({
        name,
        parentFolder: rootFolder.id,
      });

      // Save the new folder to the database
      await newFolder.save();
      console.log(newFolder);
      // Update the root folder's folders array to include the new folder
      rootFolder.folders?.push(newFolder._id);

      await rootFolder.save();

      res.status(201).send(newFolder);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);
export { router as createFolder };
