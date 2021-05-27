import { Project } from "../model/Project";
import { User } from "../model/User";
import { getConnection } from "typeorm";

export class ProjectResult {
  constructor(public messages?: string[], public project?: Project) {}
}

export class ProjectsResult {
  constructor(public messages?: string[], public projects?: Project[]) {}
}

export const createProject = async (
  name: string,
  description: string,
  author: number
): Promise<ProjectResult> => {
  const user = await getConnection().manager.findOne(User, { id: author });
  if (!user) {
    return {
      messages: ["User does not exist"],
    };
  }
  const newProject = await getConnection()
    .manager.create(Project, {
      name,
      description,
      author: user,
    })
    .save();

  if (!newProject) {
    return {
      messages: ["Failed to create a new project"],
    };
  }
  return {
    project: newProject,
  };
};

export const findProjects = async (author: number): Promise<ProjectsResult> => {
  const user = await getConnection().manager.findOne(User, { id: author });

  if (!user) {
    return {
      messages: ["User not found"],
    };
  }

  const projects = await getConnection().manager.find(Project, {
    author: user,
  });
  return {
    projects,
  };
};
