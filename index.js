require("dotenv").config();
import express from "express";
import { urlencoded, json } from "body-parser";
import AwakeRouter from "./routers/awake";
import NodesRouter from "./routers/nodes";

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());

app.use(require("cookie-parser")());

// possible middleware here

// routes
app.use("/awake", AwakeRouter);
app.use("/nodes", NodesRouter);
