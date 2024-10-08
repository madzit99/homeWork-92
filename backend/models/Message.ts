import mongoose, { Schema, Types, now } from "mongoose";
import User from "./User";

const MesseageShema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      validate: {
        validator: async (value: Types.ObjectId) => {
          const user = await User.findById(value);
          return Boolean(user);
        },
        message: "Пользователь не найден!",
      },
    },
    message: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const Message = mongoose.model("Message", MesseageShema);

export default Message;
