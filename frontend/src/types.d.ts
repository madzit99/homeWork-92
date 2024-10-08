export interface RegisterMutation {
  username: string;
  password: string;
  confirmPassword: string;
  displayName: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  displayName: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface Message {
  _id: string;
  user: User;
  message: string;
  date: number;
  personal: boolean;
}

export interface IncomingWelcomeMessage {
  type: "WELCOME";
  payload: string;
}

export interface IncomingMessages {
  type: "MESSAGES";
  payload: Message[];
}

export interface IncomingChatMessage {
  type: "NEW_MESSAGE";
  payload: Message;
}

export interface incomingOnlineMessage {
  type: "ONLINE";
  users: User[];
}

