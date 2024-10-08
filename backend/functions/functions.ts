import Message from "../models/Message";
import User from "../models/User";
import { WebSocket } from "ws";
import { ActiveConnections, OnlineUsers, messageMutation } from "../type";

export const sendMessageToActive = (
  payload: messageMutation,
  activeConnections: ActiveConnections
) => {
  Object.values(activeConnections).forEach((connection) => {
    const outgoingMsg = {
      type: "NEW_MESSAGE",
      payload,
    };
    connection.send(JSON.stringify(outgoingMsg));
  });
};

export const sendOnlineUsers = async (activeConnections: ActiveConnections) => {
  const onlineUsers = await User.find({ isActive: true });

  const outgoingMsg = {
    type: "ONLINE",
    users: onlineUsers,
  };

  Object.values(activeConnections).forEach((connection) => {
    connection.send(JSON.stringify(outgoingMsg));
  });
};

export const sendMessagesToAll = async (
  activeConnections: ActiveConnections
) => {
  const outgoingMsg = {
    type: "MESSAGES",
    payload: await FindMessages(),
  };

  Object.values(activeConnections).forEach((connection) => {
    connection.send(JSON.stringify(outgoingMsg));
  });
};

export const FindMessages = async () => {
  try {
    const messages = await Message.find()
      .sort({ date: -1 })
      .limit(30)
      .populate("user", "username displayName");

    const reversedMessages = messages.reverse();
    return reversedMessages;
  } catch (e) {
    console.error(e);
  }
};

