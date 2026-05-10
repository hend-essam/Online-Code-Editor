import express, { Request, Response } from "express";
import { requireAuth } from "../common/src/middlewares/require-auth";
import { User, Folder, File } from "../models/user";
import { currentUser } from "../middlewares/current-user";

const router = express.Router();
router.put(
  "/api/files/edit",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const userId = req.currentUser!.id; // Assuming you have middleware to set the currentUser property on the request object
    const { fileName, newFileName } = req.body;

    try {
      const user = await User.findById(userId).populate("folders");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const rootFolder = user.folders?.find((folder) => !folder.parentFolder);

      if (!rootFolder) {
        return res.status(404).json({ message: "Root folder not found" });
      }

      const existingFile = await File.findOne({
        name: fileName,
        folder: rootFolder._id,
      });

      if (!existingFile) {
        return res.status(404).json({ message: "File not found" });
      }

      existingFile.name = newFileName;
      await existingFile.save();

      res.status(200).json(existingFile);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);
router.put(
  "/api/files/edit/:fileId",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const { fileId } = req.params;
    const { newFileName } = req.body;
    try {
      const file = await File.findById(fileId);
      if (!file) return res.status(404).json({ message: "File not found" });
      file.name = newFileName;
      await file.save();
      res.status(200).json(file);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.delete(
  "/api/files/folder/:fileId",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const { fileId } = req.params;
    try {
      const file = await File.findByIdAndDelete(fileId);
      if (!file) return res.status(404).json({ message: "File not found" });
      await Folder.updateOne({ files: fileId }, { $pull: { files: fileId } });
      res.status(200).json({ message: "File deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export { router as editFile };
