import { Router } from "express";
import { setAwake } from "../firebase/firestore.js";

const router = Router();

router.post("/", async (req, res) => {
  console.log("set awake");
  const { id } = req.body;
  await setAwake(id);
  res.sendStatus(200);
});

export default router;
