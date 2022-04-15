import { Router } from "express";
import { setAwake } from "../firebase/firestore";

const router = Router();

router.post("/", async (req, res) => {
  const { id } = req.body;
  await setAwake(id);
  res.sendStatus(200);
});

export default router;
