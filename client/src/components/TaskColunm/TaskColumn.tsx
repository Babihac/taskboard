import react, { FC, Fragment } from "react";
import { TaskTypes } from "../../dragTypes/TaskTypes";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { StatusType } from "../../redux/types/statusType";
import { useDrop } from "react-dnd";
import Task from "../Task/Task";
import "./taskColumn.scss";
import { Task as TaskType } from "../../redux/types/TaskType";

import { useAction } from "../../hooks/useTaskAction";

interface TaskColumnProps {
  status: StatusType;
  statusName: string;
}

const TaskColumn: FC<TaskColumnProps> = ({ status, statusName }) => {
  const { changeTaskStatus } = useAction();
  const tasks = useTypedSelector((state) =>
    state.taskList.tasks.filter((task) => task.status === status)
  );

  const [{ isOver }, drop] = useDrop(() => ({
    accept: TaskTypes.TASK,
    drop: (item: TaskType) => {
      console.log(item);
      return { status: status };
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  return (
    <div
      style={
        isOver
          ? {
              backgroundColor: "rgb(170, 206, 159) ",
              transition: "all .5s ease-out",
            }
          : {}
      }
      ref={drop}
      className="task-column column"
    >
      <h2>{statusName}</h2>
      {tasks.map((task) => (
        <Fragment key={task.id}>
          <Task
            id={task.id}
            body={task.body}
            title={task.title}
            status={status}
          />
          <div className="is-divider"></div>
        </Fragment>
      ))}
    </div>
  );
};

export default TaskColumn;
