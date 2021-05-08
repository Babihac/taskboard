import react, { FC, Fragment, useState, useEffect, useRef } from "react";
import { TaskTypes } from "../../dragTypes/TaskTypes";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { StatusType } from "../../redux/types/statusType";
import { useDrop } from "react-dnd";
import Task from "../Task/Task";
import "./taskColumn.scss";
import { Task as TaskType } from "../../redux/types/TaskType";
import NewTaskModal from "../newTaskModal/NewTaskModal";

interface TaskColumnProps {
  status: StatusType;
  statusName: string;
}

const TaskColumn: FC<TaskColumnProps> = ({ status, statusName }) => {
  const tasks = useTypedSelector((state) =>
    state.taskList.tasks.filter((task) => task.status === status)
  );

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

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
    <Fragment>
      <NewTaskModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        status={status}
      />
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
        className="task-column column mt-4"
      >
        <div className="column-heading">
          <h2 className="title is-2">{statusName}</h2>
          <button onClick={openModal} className="button is-link">
            +
          </button>
        </div>
        {tasks.map((task) => (
          <Fragment key={task.title}>
            <Task
              id={task.id}
              body={task.body}
              title={task.title}
              status={status}
              isLoading={task.isLoading}
            />
            <div className="is-divider"></div>
          </Fragment>
        ))}
      </div>
    </Fragment>
  );
};

export default TaskColumn;
