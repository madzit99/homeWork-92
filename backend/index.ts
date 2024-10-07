import express from "express";
import expressWs from "express-ws";
import mongoose from "mongoose";
import config from "./config";

const app = express();
expressWs(app);

const port = 8000;

const chatRouter = express.Router();

chatRouter.ws("/chat", (ws, req) => {
  console.log("client connected");
});


const run = async () => {
  await mongoose.connect(config.database);

  app.use(chatRouter);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};