import { Router } from "express";
import { getNodes, setNodeBusy, setNotAwake } from "./firebase/firestore.js";

const detectPeopleSendLog = async (node) => {
  try {
    const { target, id } = node;
    const response = await fetch(`${target}/detect_people`).then((res) =>
      res.json()
    );
    if (!!response.detect_people) {
      console.log(`${id} id detected people`);
    }
    await setNodeBusy(id);
  } catch (error) {
    console.error(error);
    await setNotAwake(node.id);
  }
};
const loop = async () => {
  // get all nodes
  const nodes = await getNodes();
  // filter awake nodes
  const awakeNodes = nodes.filter((node) => node.awake);
  // display error if no nodes are awake
  if (awakeNodes.length === 0) {
    console.error("No nodes are awake");
    return false;
  }
  // for each awake node
  for (const node of awakeNodes) {
    // target url
    detectPeopleSendLog(node);
  }
};

const router = Router();

let interval;
router.get("/start", (req, res) => {
  try {
    interval = setInterval(async () => {
      await loop();
    }, 30000);
    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
});

router.get("/stop", (req, res) => {
  try {
    clearInterval(interval);
    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
});

export default router;
