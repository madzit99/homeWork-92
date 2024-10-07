import express from "express";
import expressWs from "express-ws";
import mongoose from "mongoose";
import config from "./config";
import cors from "cors";
import userRouter from "./routers/users";

const app = express();
// expressWs(app);

const port = 8000;

app.use(express.json());
app.use(cors());

// const chatRouter = express.Router();

app.use("/users", userRouter);

// chatRouter.ws("/chat", (ws, req) => {
//   console.log("client connected");
// });

// app.use(chatRouter);

const run = async () => {
  await mongoose.connect(config.database);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};

void run();
