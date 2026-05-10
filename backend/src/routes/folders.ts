import express, { Request, Response } from "express";
import { requireAuth } from "../common/src/middlewares/require-auth";
import { User, Folder } from "../models/user";
import { currentUser } from "../middlewares/current-user";

const router = express.Router();

router.get(
  "/api/folders",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const userId = req.currentUser!.id; // Assuming you have middleware to set the currentUser property on the request object

    try {
      const user = await User.findById(userId).populate({
        path: "folders",
        populate: [
          { path: "files" },
          {
            path: "folders",
            populate: { path: "files" },
          },
        ],
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user.folders);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export { router as foldersRouter };
