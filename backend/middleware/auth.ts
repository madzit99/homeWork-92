import User from "../models/User";

export const authWs = async (token: string) => {
  try {
    const user = await User.findById(token)
    return user;
  } catch (error) {
    console.log(error);
  }
};
