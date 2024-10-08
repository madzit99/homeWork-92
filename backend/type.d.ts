import { Model } from "mongoose";
import { WebSocket } from "ws";

export interface UserFields {
  username: string;
  password: string;
  token: string;
  __confirmPassword: string;
  displayName: string;
  isActive: boolean;
}

export interface UserVirtuals {
  confirmPassword: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods, UserVirtuals>;

export interface messageMutation {
  _id: mongoose.Type.ObjectId;
  user: UserType;
  message: string;
  date: Date;
}

export interface ActiveConnections {
  [id: string]: WebSocket;
}
export interface OnlineUser {
  _id: mongoose.Types.ObjectId | string;
  displayName: string;
  token: string;
  isActive: boolean;
  username: string;
}

export interface OnlineUsers {
  [id: string]: OnlineUser;
}

export interface UserType {
  _id: mongoose.Types.ObjectId;
  username: string;
  displayName: string;
  token: string;
  isActive: boolean;
}

export interface IncomingMessage {
  type: string;
  payload: {
    _id: string;
    user: UserType;
    message: string;
    date: Date;
    receiver: UserType;
  };
}

export interface messageMutation {
  _id: mongoose.Type.ObjectId;
  user: UserType;
  message: string;
  date: Date;
}