import react, { FC } from "react";
import { TaskTypes } from "../../dragTypes/TaskTypes";
import { useAction } from "../../hooks/useTaskAction";
import { useDrag } from "react-dnd";
import "./task.scss";
import { StatusType } from "../../redux/types/statusType";

interface TaskProps {
  id: string;
  title: string;
  body: string;
  status: "TODO" | "IN_TEST" | "IN_PROGRESS";
}

const Task: FC<TaskProps> = ({ id, title, body, status }) => {
  const { deleteTask, changeTaskStatus } = useAction();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: TaskTypes.TASK,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        const res = monitor.getDropResult<{ status: StatusType }>();
        if (res?.status) {
          changeTaskStatus(id, res.status);
        }
      }
    },
  }));
  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="card mt-6 task"
    >
      <p className="card-header-title">{title}</p>
      <div className="card-content">
        <div className="content">{body}</div>
      </div>
      <footer className="card-footer">
        <a href="#" className="card-footer-item">
          Save
        </a>
        <a href="#" className="card-footer-item">
          Edit
        </a>
        <button
          onClick={() => deleteTask(id)}
          className="card-footer-item is-hoverable btn-delete"
        >
          <span>Delete</span>
        </button>
      </footer>
    </div>
  );
};

export default Task;
