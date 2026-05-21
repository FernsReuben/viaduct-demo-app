import { Router } from "express";
import { groups } from "../data/groups";

const router = Router();

router.get("/", (_, res) => {
  res.json(groups);
});

export default router;