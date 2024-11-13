import express, { Request, Response } from "express";
import { File } from "../models/user";

const router = express.Router();

router.get("/api/languages", async (req: Request, res: Response) => {
  try {
    const languages = await File.aggregate([
      { $group: { _id: "$language", count: { $sum: 1 } } },
      { $project: { _id: 0, language: "$_id", count: 1 } },
    ]);

    res.json(languages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export { router as languagesRouter };
