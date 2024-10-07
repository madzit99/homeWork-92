import { Model } from "mongoose";

export interface UserFields {
  username: string;
  password: string;
  token: string;
  __confirmPassword: string;
  displayName: string;
}

export interface UserVirtuals {
  confirmPassword: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods, UserVirtuals>;

export interface ChatMessage {
  username: string;
  message: string;
}

export interface IncomingMessage {
  type: string;
  payload: ChatMessage;
}
