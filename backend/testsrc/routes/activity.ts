import { Router } from "express";
import { activity } from "../data/activity";

const router = Router();

router.get("/", (_, res) => {
  res.json(activity);
});

export default router;