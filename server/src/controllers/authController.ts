import { Request, Response, NextFunction } from "express";
import { register, login, findUser } from "../repo/userRepo";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      username,
      passwordConfirm,
    } = req.body;
    const newUser = await register(
      firstName,
      lastName,
      email,
      username,
      password,
      passwordConfirm
    );

    if (newUser && newUser.user) {
      res.status(201).json({
        status: "OK",
        newUser: newUser.user,
      });
    } else if (newUser && newUser.messages) {
      res.status(200).json({
        error: newUser.messages,
      });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const loginResult = await login(username, password);
    if (loginResult && loginResult.messages) {
      res.status(400).json({
        message: loginResult.messages,
        isLoggedIn: false,
        user: null,
      });
    } else if (loginResult && loginResult.user) {
      req.session.userid = loginResult.user.id;
      req.session.username = loginResult.user.username;
      res.status(200);
      res.cookie("test", "haha", { sameSite: "none" });
      res.json({
        status: "OK",
        message: `User is logged in ${req.session.userid}`,
        user: loginResult.user,
        isLoggedIn: true,
      });
    }
    console.log(req.session);
  } catch (err) {
    res.status(400).json({
      error: err,
      isLoggedIn: false,
    });
  }
};

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("session destroy failed");
    }
    console.log("session destroyed");
  });

  res.status(204).json("user is logged out");
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.session);
    if (req.session && req.session.userid) {
      const user = await findUser(req.session.userid);
      if (user && user.user) {
        res.status(200).json({
          user: user.user,
          message: "user found",
          status: "OK",
        });
      }
      if (user && user.messages) {
        res.status(200).json({
          user: null,
          message: user.messages,
          status: "Failed",
        });
      }
    } else {
      res.status(200).json({
        status: "Failed",
        message: "user is not logged in",
      });
    }
  } catch (err) {
    res.status(200).json({
      error: err,
    });
  }
};
