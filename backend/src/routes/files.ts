import express, { Request, Response } from "express";
import { requireAuth } from "../common/src/middlewares/require-auth";
import { User, Folder, File } from "../models/user";
import { currentUser } from "../middlewares/current-user";

const router = express.Router();

router.get(
  "/api/files/id/:fileId",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const { fileId } = req.params;
    try {
      const file = await File.findById(fileId);
      if (!file) return res.status(404).json({ message: "File not found" });
      res.status(200).json(file);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.put(
  "/api/files/:fileId/content",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const { fileId } = req.params;
    const { fileContent } = req.body;
    try {
      const file = await File.findById(fileId);
      if (!file) return res.status(404).json({ message: "File not found" });
      file.content = fileContent;
      await file.save();
      res.status(200).json(file);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.post(
  "/api/files/folder/:folderId",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const { folderId } = req.params;
    const { fileName, fileContent } = req.body;

    try {
      const folder = await Folder.findById(folderId);
      if (!folder) return res.status(404).json({ message: "Folder not found" });

      let existingFile = await File.findOne({ name: fileName, folder: folderId });
      if (existingFile) {
        existingFile.content = fileContent;
        await existingFile.save();
        return res.status(200).json(existingFile);
      }

      const newFile = File.build({ name: fileName, content: fileContent ?? "" });
      folder.files?.push(newFile._id);
      await newFile.save();
      await folder.save();

      res.status(201).json(newFile);
    } catch (err: any) {
      console.error("Create file in folder error:", err.message);
      res.status(500).json({ message: err.message || "Server error" });
    }
  }
);

router.post(
  "/api/files",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const userId = req.currentUser!.id;
    const { fileName, fileContent } = req.body;

    try {
      const user = await User.findById(userId).populate("folders");
      if (!user) return res.status(404).json({ message: "User not found" });

      const rootFolder = user.folders?.find((folder) => !folder.parentFolder);
      if (!rootFolder) return res.status(404).json({ message: "Root folder not found" });

      let existingFile = await File.findOne({ name: fileName, folder: rootFolder._id });
      if (existingFile) {
        existingFile.content = fileContent;
        await existingFile.save();
        return res.status(200).json(existingFile);
      }

      const newFile = File.build({ name: fileName, content: fileContent });
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
