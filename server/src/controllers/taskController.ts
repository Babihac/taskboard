import { Request, Response, NextFunction } from "express";
import {
  createTask,
  allTasks,
  taskById,
  tasksByUserId,
} from "../repo/taskRepo";
export const createNewTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, body } = req.body;
    let status;
    if (req.body.status) {
      status = req.body.status;
    }
    status = "Todo";
    const userId = req.session.userid;
    const newTask = await createTask(title, body, status, userId);
    console.log(newTask);
    if (newTask && newTask.task) {
      res.status(200).json({
        status: "success",
        task: newTask,
      });
    }

    if (newTask && newTask.messages) {
      res.status(400).json({
        message: newTask.messages,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.query);
    const userId = req.params.userId;
    const tasks = await allTasks(parseInt(userId), req.query);
    if (tasks && tasks.tasks) {
      res.status(200).json({
        status: "success",
        tasks,
      });
    }

    if (tasks && tasks.messages) {
      res.status(400).json({
        message: tasks.messages,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.params);
    const task = await taskById(parseInt(req.params.id));
    if (task && task.task) {
      res.status(200).json({
        status: "success",
        task,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

export const getTasksByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await tasksByUserId(parseInt(req.params.userid));
    if (tasks && tasks.tasks) {
      res.status(200).json({
        status: "success",
        tasks,
      });
    }

    if (tasks && tasks.messages) {
      res.status(400).json({
        message: tasks.messages,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
