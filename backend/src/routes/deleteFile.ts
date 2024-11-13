import express, { Request, Response } from "express";
import { requireAuth } from "../common/src/middlewares/require-auth";
import { User, Folder, File } from "../models/user";
import { currentUser } from "../middlewares/current-user";

const router = express.Router();
router.delete(
  "/api/files/:fileName",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const userId = req.currentUser!.id;
    const fileName = req.params.fileName;

    try {
      const user = await User.findById(userId).populate("folders");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const rootFolder = user.folders?.find((folder) => !folder.parentFolder);

      if (!rootFolder) {
        return res.status(404).json({ message: "Root folder not found" });
      }

      const existingFile = await File.findOneAndDelete({
        name: fileName,
        folder: rootFolder._id,
      });

      if (!existingFile) {
        return res.status(404).json({ message: "File not found" });
      }

      // Remove the file from the root folder's files array
      rootFolder.files = rootFolder.files?.filter(
        (file) => file.toString() !== fileName
      );

      await rootFolder.save();

      res.status(200).json({ message: "File deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);
export { router as deleteFile };
