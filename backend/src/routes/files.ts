import express, { Request, Response } from "express";
import { requireAuth } from "../common/src/middlewares/require-auth";
import { User, Folder, File } from "../models/user";
import { currentUser } from "../middlewares/current-user";

const router = express.Router();

router.post(
  "/api/files",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const userId = req.currentUser!.id; // Assuming you have middleware to set the currentUser property on the request object
    const { fileName, fileContent } = req.body;

    try {
      const user = await User.findById(userId).populate("folders");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const rootFolder = user.folders?.find((folder) => !folder.parentFolder);

      if (!rootFolder) {
        return res.status(404).json({ message: "Root folder not found" });
      }

      let existingFile = await File.findOne({
        name: fileName,
        folder: rootFolder._id,
      });

      if (existingFile) {
        // Update the existing file
        existingFile.content = fileContent;
        await existingFile.save();
        return res.status(200).json(existingFile);
      }

      const newFile = File.build({
        name: fileName,
        content: fileContent,
      });

      rootFolder.files?.push(newFile._id);
      await newFile.save();
      await rootFolder.save();

      res.status(201).json(newFile);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export { router as createFile };
