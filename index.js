import express from "express";
import bodyParser from "body-parser";
import AwakeRouter from "./routers/awake.js";
import NodesRouter from "./routers/nodes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(cookieParser());

// possible middleware here

// routes
app.use("/awake", AwakeRouter);
app.use("/nodes", NodesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
