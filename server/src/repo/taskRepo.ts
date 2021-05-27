import { Task } from "../model/Task";
import { getConnection } from "typeorm";
import { User } from "../model/User";

interface TaskParams {
  userid?: number;
}

export class TaskResult {
  constructor(public messages?: Array<string>, public task?: Task) {}
}

export class TasksResult {
  constructor(public messages?: Array<string>, public tasks?: Task[]) {}
}

export const createTask = async (
  title: string,
  body: string,
  status: string,
  userId: number
): Promise<TaskResult> => {
  const user = await getConnection().manager.findOne(User, { id: userId });
  if (!user) {
    return {
      messages: ["User is not logged in"],
    };
  }
  const newTask = await getConnection()
    .manager.create(Task, {
      title,
      body,
      status,
      user,
      createdBy: user.username,
      lastModifiedBy: user.username,
    })
    .save();

  if (!newTask) {
    return {
      messages: ["Failed to create new task"],
    };
  }

  return {
    task: newTask,
  };
};

export const allTasks = async (
  userId: number,
  params: TaskParams
): Promise<TasksResult> => {
  if (params.userid) {
    const user = await getConnection().manager.findOne(User, {
      id: params.userid,
    });

    if (!user) {
      return {
        messages: [`User with userId ${userId} not found`],
      };
    }

    const tasks = await getConnection().manager.find(Task, {
      user: { id: params.userid },
    });
    return {
      tasks: tasks,
    };
  }

  const tasks = await getConnection().manager.find(Task);
  return {
    tasks: tasks,
  };
};

export const tasksByUserId = async (userId: number): Promise<TasksResult> => {
  const user = await getConnection().manager.findOne(User, { id: userId });
  if (!user) {
    return {
      messages: [`User with userId ${userId} not found`],
    };
  }

  const tasks = await getConnection().manager.find(Task, { user });
  return {
    tasks: tasks,
  };
};

export const taskById = async (id: number): Promise<TaskResult> => {
  const task = await getConnection().manager.findOne(Task, { id });
  if (!task) {
    return {
      messages: [`Task with id: ${id} does not exist`],
    };
  }

  return {
    task,
  };
};

export const deleteTaskById = async (id: number): Promise<string> => {
  const task = await getConnection().manager.findOne(Task, { id });
  if (!task) {
    return `Task with id ${id} not found`;
  }
  await task.remove();
  return `Task with id ${id} was deleted`;
};

export const updateTaskById = async (
  id: number,
  data: { status?: string; body?: string; title?: string }
): Promise<TaskResult> => {
  const task = await getConnection().manager.findOne(Task, { id });

  if (!task) {
    return {
      messages: [`Task with id ${id} does not exist`],
    };
  }

  const date = new Date();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const updatedTask = await getConnection().manager.save(Task, {
    ...task,
    ...data,
    lastModifiedOn: `${date.getFullYear()}-${month}-${day} ${date.getHours()}:${date.getMinutes()}`,
  });

  return {
    task: updatedTask,
  };

  // const updatedTask = await getConnection()
  //   .createQueryBuilder()
  //   .update(Task)
  //   .set({ ...data })
  //   .where("id:=id", { id })
  //   .execute();
};
