import app from "./app.js";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  getFirestore,
} from "firebase/firestore";

const db = getFirestore(app);

export const setAwake = async (id) => {
  await setDoc(doc(db, "nodes", String(id)), {
    awake: true,
  });
};

export const setNotAwake = async (id) => {
  await setDoc(doc(db, "nodes", String(id)), {
    awake: false,
  });
};

export const getNodes = async () => {
  const nodes = await getDocs(collection(db, "nodes"));
  const data = [];
  nodes.forEach((node) => {
    data.push(node.data());
  });
  console.log(data);
  return nodes.map((node) => node.data());
};

export const setNodeFree = async (id) => {
  await setDoc(doc(db, "nodes", String(id)), {
    people: false,
  });
};

export const setNodeBusy = async (id) => {
  await setDoc(doc(db, "nodes", String(id)), {
    people: true,
  });
};

export const getNodesByBlock = async (block) => {
  const nodes = await getDocs(collection(db, "nodes"));
  return nodes.filter((node) => node.data().block === block);
};

export const getNodesByBlockAndIndex = async (block, index) => {
  const nodes = await getDocs(collection(db, "nodes"));
  return nodes.filter(
    (node) => node.data().block === block && node.data().index === Number(index)
  );
};

export const sendDetectionLog = async (nodeId, detected) => {
  await setDoc(doc(db, "nodes", String(nodeId)), {
    people: detected,
  });
  await addDoc(collection(db, `nodes/${nodeId}/logs`), {
    people: detected,
    created_at: new Date().toISOString(),
  });
};
