import express from "express";
import expressWs from "express-ws";
import mongoose from "mongoose";
import config from "./config";
import cors from "cors";
import userRouter from "./routers/users";
import { ActiveConnections, IncomingMessage, OnlineUsers, messageMutation } from "./type";
import { sendMessageToActive, sendOnlineUsers } from "./functions/functions";
import Message from "./models/Message";
import User from "./models/User";
import { authWs } from "./middleware/auth";

const app = express();
expressWs(app);

const port = 8000;

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);

const chatRouter = express.Router();

const activeConnections: ActiveConnections = {};

const users: OnlineUsers = {};

chatRouter.ws("/chat", (ws, req) => {
  const id = crypto.randomUUID();
  console.log("Client connected id=", id);
  activeConnections[id] = ws;

  ws.on("message", async (message) => {
    const parsedMessage = JSON.parse(message.toString()) as IncomingMessage;

    if (parsedMessage.type === "LOGIN") {
      const user = await authWs(parsedMessage.payload.user.token);

      if (user) {
        user.isActive = true;
        await user.save();
        console.log("Аутентификация прошла успешно");

        await sendOnlineUsers(activeConnections);
        users[id] = user;
        console.log(users);
      } else {
        ws.close();
      }
    }

    if (parsedMessage.type === "SEND_MESSAGE") {
      const newMessage = new Message({
        user: parsedMessage.payload.user._id,
        message: parsedMessage.payload.message,
      });
      newMessage.save();

      const payload: messageMutation = {
        user: parsedMessage.payload.user,
        message: parsedMessage.payload.message,
        date: new Date(),
        _id: newMessage._id,
      };

      sendMessageToActive(payload, activeConnections);
    }
  });

  ws.on("close", async () => {
    console.log("Пользователь отключен", id);
    const user = users[id];
    if (user) {
      const userDB = await User.findById(user._id);
      if (userDB) {
        userDB.isActive = false;
        await userDB.save();
        sendOnlineUsers(activeConnections);
      }
      delete users[id];
    }
    delete activeConnections[id];
  });
});

app.use(chatRouter);

const run = async () => {
  await mongoose.connect(config.database);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

void run();

