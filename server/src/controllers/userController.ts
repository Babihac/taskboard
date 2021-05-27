import { Request, Response, NextFunction } from "express";
import { updateUser, updateUserPassword } from "../repo/userRepo";

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filteredData: { [key: string]: string } = {};
    const allowedData = ["username", "firstName", "lastName", "email"];
    for (const key in req.body) {
      if (allowedData.includes(key)) {
        filteredData[key] = req.body[key];
      }
    }
    const updatedUser = await updateUser(req.params.id, filteredData);

    if (updatedUser && updatedUser.user) {
      res.status(200).json({
        status: "ok",
        updatedUser: updatedUser.user,
      });
    } else if (updatedUser && updatedUser.messages) {
      res.status(400).json({
        status: "fail",
        message: updatedUser.messages,
      });
    } else {
      res.status(400).json({
        message: "Something went wrong",
      });
    }
  } catch (err) {
    res.status(400).json({
      err: err.message,
    });
  }
};

export const updateUserPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { oldPassword, passwordConfirm, newPassword } = req.body;
    const updateResult = await updateUserPassword(
      req.params.id,
      oldPassword,
      newPassword,
      passwordConfirm
    );

    if (updateResult.user) {
      console.log("success");
      res.status(200).json({
        status: "ok",
      });
    } else if (updateResult.messages) {
      console.log("message");
      res.status(200).json({
        message: updateResult.messages[0],
      });
    } else {
      console.log("message 3");
      res.status(200).json({
        message: "something went wrong",
      });
    }
  } catch (err) {
    console.log("error");
    res.status(400).json({
      err: err.message,
    });
  }
};

// function filterAllowedFields(data: any, allowedFields: string[]) {
//   const filteredData: { [key: string]: string } = {};
//   const allowedData = ["username", "firstName", "lastName", "email"];
//   for (const key in data) {
//     if (allowedData.includes(key)) {
//       filteredData[key] = data[key];
//     }
//   }
//   return filteredData;
// }
