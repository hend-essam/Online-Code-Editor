import express, { Request, Response } from "express";
import { requireAuth } from "../common/src/middlewares/require-auth";
import { User, Folder, File } from "../models/user";

const router = express.Router();

router.get(
  "/api/files/:fileName",
  requireAuth,
  async (req: Request, res: Response) => {
    const userId = req.currentUser!.id; // Assuming you have middleware to set the currentUser property on the request object
    const fileName = req.params.fileName;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const file = user.folders?.reduce(
        (foundFile: File | null, folder: any) => {
          if (foundFile) {
            return foundFile;
          }

          return folder.files.find((f: File) => f.name === fileName) || null;
        },
        null
      );

      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }

      res.json(file);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export { router as getFile };
