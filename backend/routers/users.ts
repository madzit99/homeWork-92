import express, { NextFunction, Request, Response } from "express";
import User from "../models/User";

const userRouter = express.Router();

userRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = new User({
        username: req.body.username,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        displayName: req.body.displayName,
      });
      user.generateToken();
      await user.save();
      res.send(user);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post(
  "/sessions",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        res
          .status(422)
          .send({ error: "Неверное имя пользователя или пароль!!" });
      }

      const isMatch = await user!.checkPassword(req.body.password);

      if (!isMatch) {
        res
          .status(422)
          .send({ error: "Неверное имя пользователя или пароль!!" });
      }
      user!.generateToken();
      await user!.save();
    } catch (error) {
      next(error);
    }
  }
);

userRouter.delete(
  "/sessions",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const headerValue = req.get("Authorization");

      const succsessMessage = { message: "Succsess!" };

      if (!headerValue) {
        res.send({ ...succsessMessage, stage: "No header" });
      }

      const [_bearer, token] = headerValue!.split(" ");

      if (!token) {
        res.send({ ...succsessMessage, stage: "No token" });
      }

      const user = await User.findOne({ token });

      if (!user) {
        res.send({ ...succsessMessage, stage: "No user" });
      }

      user!.generateToken();

      await user!.save();

      res.send({ ...succsessMessage, stege: "Succsess!" });
    } catch (error) {
      next(error);
    }
  }
);

export default userRouter;
