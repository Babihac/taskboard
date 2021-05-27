import { Request, Response, NextFunction } from "express";
import {
  createTask,
  allTasks,
  taskById,
  tasksByUserId,
  deleteTaskById,
  updateTaskById,
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
    } else {
      status = "TODO";
    }
    const userId = req.session.userid;
    const newTask = await createTask(title, body, status, userId);
    console.log(newTask);
    if (newTask && newTask.task) {
      res.status(200).json({
        status: "success",
        task: newTask.task,
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
        tasks: tasks.tasks,
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

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const message = await deleteTaskById(parseInt(req.params.id));

    res.status(200).json({
      message,
      test: "ahoj",
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateResult = await updateTaskById(
      parseInt(req.params.id),
      req.body
    );
    if (updateResult && updateResult.task) {
      res.status(200).json({
        status: "success",
        updatedTask: updateResult.task,
      });
    } else {
      res.status(400).json({
        status: "failure",
        error: updateResult.messages,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failure",
      error: err.message,
    });
  }
};
