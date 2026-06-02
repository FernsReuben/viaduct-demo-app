import { Router } from "express";
import { externalGroups } from "../data/externalGroups";

const router = Router();

router.get("/", (_, res) => {
  res.json(externalGroups);
});

export default router;
