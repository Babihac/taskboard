import { Request, Response, NextFunction } from "express";
import { createProject, findProjects } from "../repo/projectRepo";

export const createProjectController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, author } = req.body;
    const projectResult = await createProject(name, description, author);
    if (projectResult.project) {
      res.status(201).json({
        status: "ok",
        project: projectResult.project,
      });
    } else if (projectResult.messages) {
      res.status(200).json({
        status: "warning",
        messages: projectResult.messages,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

export const findProjectsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projectsResult = await findProjects(parseInt(req.params.userid));
    if (projectsResult.projects) {
      res.status(200).json({
        status: "ok",
        projects: projectsResult.projects,
      });
    } else if (projectsResult.messages) {
      res.status(200).json({
        status: "warning",
        messages: projectsResult.messages,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
